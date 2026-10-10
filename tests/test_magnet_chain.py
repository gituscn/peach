"""磁力抓取链的纯判据；不连接真实站点。"""
import unittest

from peach.downloads import parse_magnet
from peach.magnet_chain import (CHAIN, _normalise, decode_base91, rank_candidates,
                                resolution_of, size_bytes)

HASH_A = "c9e15763f722f23e98a29decdfae341b98d53056"
HASH_B = "d9e15763f722f23e98a29decdfae341b98d53056"


def item(info_hash, **fields):
    return {
        "id": info_hash, "info_hash": info_hash,
        "uri": f"magnet:?xt=urn:btih:{info_hash}&dn=ABC-123",
        "name": "ABC-123", "size": 0, "size_text": "", "files": "",
        "file_count": 0, "file_list": [], "promo_files": 0,
        "resolution": 0, "codec": "", "seeders": 0, "peers": 0, "date": "",
        "chinese": False, "uncensored": False,
        "source": "test", "origins": ["test"], "source_url": "",
        "watermark_check": "pending", **fields,
    }


class MagnetChainTests(unittest.TestCase):
    def test_base91_decodes_the_api_envelope_payload(self):
        # basE91 官方示例：编码后的这一段解回 ASCII "test"。
        self.assertEqual(decode_base91("fPNKd"), b"test")

    def test_resolution_and_size_are_normalised(self):
        self.assertEqual(resolution_of("[FHD] ABC-123"), 1080)
        self.assertEqual(resolution_of("ABC-123 4K"), 2160)
        self.assertEqual(size_bytes("2.5 GiB"), int(2.5 * 1024 ** 3))

    def test_manko_bypasses_watermark_gate_but_other_sources_do_not(self):
        manko = _normalise({"uri": item(HASH_A)["uri"], "name": "ABC-123 FHD"},
                           CHAIN[0], "ABC-123")
        javdb = _normalise({"uri": item(HASH_B)["uri"], "name": "ABC-123 FHD"},
                           CHAIN[1], "ABC-123")
        self.assertEqual((manko["watermark_check"], javdb["watermark_check"]),
                         ("bypassed", "pending"))

    def test_file_count_is_not_a_rejection_and_quality_wins(self):
        many = item(HASH_A, resolution=2160, file_count=8, promo_files=2, seeders=1)
        single = item(HASH_B, resolution=1080, file_count=1, seeders=20)
        ranked = rank_candidates([single, many])
        self.assertEqual([row["info_hash"] for row in ranked], [HASH_A, HASH_B])

    def test_selected_edition_goal_wins_before_resolution(self):
        chinese = item(HASH_A, resolution=1080, chinese=True)
        plain = item(HASH_B, resolution=2160)
        self.assertEqual(rank_candidates([plain, chinese], "chinese")[0]["info_hash"], HASH_A)

    def test_mismatched_release_is_rejected(self):
        candidate = _normalise({"uri": item(HASH_A)["uri"], "name": "ABC-124 FHD"},
                               CHAIN[1], "ABC-123")
        self.assertIsNone(candidate)
        self.assertEqual(parse_magnet(item(HASH_A)["uri"]).info_hash, HASH_A)


if __name__ == "__main__":
    unittest.main()

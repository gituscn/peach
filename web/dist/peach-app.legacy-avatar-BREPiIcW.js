// src/react/components/legacy-avatar.ts
(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "0a1d0caa-5e57-4b56-99d9-2a3c78044d6b", e._sentryDebugIdIdentifier = "sentry-dbid-0a1d0caa-5e57-4b56-99d9-2a3c78044d6b");
	} catch {}
})();
var e = "[&_img]:absolute [&_img]:inset-0 [&_img]:size-full [&_img]:max-w-none [&_img]:max-h-none [&_img]:object-cover";
export { e as LEGACY_AVATAR_IMG };

//# debugId=0a1d0caa-5e57-4b56-99d9-2a3c78044d6b
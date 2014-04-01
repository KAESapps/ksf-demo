require.config({
	paths: {
		ksf: 'ksf/src',
		'ksf-ui': 'ksf-ui/src',
	},
	map: {
		'*': {
			kss: 'ksf/dom/style/amd-loader/kss'
		}
	}
});

if (typeof document !== "undefined") {
	define(['ksf/require-config', 'ksf-ui/require-config'], function() {});
}
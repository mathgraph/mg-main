define(['mg-space2/utils/curve2'], function (curve2) {
	return function () {
		var A, B, C, D, E, F;
		console.log('=====================');
		for (A = -2; A <= 2; A++) {
			for (B = -2; B <= 2; B++) {
				for (C = 2; C <= 2; C++) {
					for (D = 2; D <= 2; D++) {
						for (E = 2; E <= 2; E++) {
							for (F = -2; F <= 2; F++) {
								// if (A == 2 || B == 2 || F == 2) continue;
								var eq = {
									A: A,
									B: B,
									C: C,
									D: D, 
									E: E, 
									F: F
								};
								console.log('input: ' + JSON.stringify(eq));
								console.log('output: ' + JSON.stringify(curve2.getCanonical(eq)));
								console.log('=====================');
							}
						}
					}
				}
			}
		}
	}

});
(function(angular){
	angular.module("pointcolor", []).service("pointcolor", function(){
		return {
			mint: {
				active: "#38c9aa",
				disable: "#ebebeb"
			},
			lightblue: {
				active: "#45b9e6",
				disable: "#ebebeb"
			},
			ivory: {
				active: "#daceb8",
				disable: "#ebebeb"
			},
			
			// 파이차트 색깔 모음
			_pieChart: [
				"#4573a7",
				"#aa4644",
				"#89a54e",
				"#71588f",
				"#4298af",
				"#db843d",
				"#93a9d0",
				"#d09392"
			]
			// 끝에는 쉼표(,)를 붙이지 않습니다.
		};
	});
})(angular);
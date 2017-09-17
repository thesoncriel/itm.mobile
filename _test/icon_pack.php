<?
$aIcon = array(
"icon-write",
"icon-calendar-data-yes",
"icon-gray-border",
"icon-calendar",
"icon-circleplus",
"icon-crown1",
"icon-crown2",
"icon-crown3",
"icon-menubstar",
"icon-menucalendar",
"icon-menucheck",
"icon-menumoney",
"icon-menumoney-08",
"icon-menuperson",
"icon-menusetting",
"icon-menuwstar",
"icon-nav1",
"icon-nav1-on",
"icon-nav2",
"icon-nav2-on",
"icon-nav3-on",
"icon-nav3",
"icon-nav4",
"icon-nav4-on",
"icon-nav5",
"icon-nav5-on",
"icon-nav6",
"icon-nav6-on",
"icon-nav7",
"icon-nav7-on",
"icon-nav8",
"icon-nav8-on",
"icon-time",
"icon-tooltip",
"icon-remark1",
"icon-remark2",
"icon-remark3",
"icon-remark4",
"icon-remark5",
"icon-remark6",
"icon-select-arrow",
"icon-camera",
"icon-i",
"icon-leftarrow",
"icon-leftarrow-act",
"icon-listleftarrow",
"icon-menuclose",
"icon-list",
"icon-plus",
"icon-read-more",
"icon-rightarrow",
"icon-rightarrow-act",
"icon-setting"
);
?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>icon pack preview</title>
		<link rel="stylesheet" type="text/css" href=".../css/icon-pack.css"/>
		<!-- 
			스타일 셀렉터만 뽑을 때 정규식
			\s?\{[^*.*$*]*\}[\r\n]{0,2}
		-->
	</head>
	<body>
		<section>
			<article>
				<h1>Icon Pack</h1>
				<p>
					급한대로 기존 코더가 만들어 놨던 아이콘들을 죄다 병합(Merge) 하여 만든겁니다.
					후에 적용 할 땐 제대로 하시면 좋을 듯 =_=
				</p>
				<h2>Icon Image</h2>
				<img src="../img/icon-pack.png"/>
				<h2>Icon List</h2>
				<ul>
					<?for ($i = 0; $i < count($aIcon); $i++):?>
						<li><i class="icon <?=$aIcon[$i]?>"></i> icon <?=$aIcon[$i]?></li>
					<?endfor?>
				</ul>
			</article>
		</section>
	</body>
</html>
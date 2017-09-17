<?
include_once "../model/_BaseModel.php";

	// 메인에서 보여지는 오늘의 영어 처리 Model
 	class MainTodayEnglishDAO extends Ora_BaseModel{
 		public function __construct(){
 			
 		}
		public function getData(){
			$mData = array(
				"seq" => 292,
				"title" => "How many are in your party?",
				"transtitle" => "일행이 모두 몇 분이신가요?",
				"view_date" => "2015-11-10"
			);
			
			return $mData;
		}
 	}
	
	//http://new.carrotenglish.com/study/word_study.html
	// 오늘의 영어: 오늘의 비즈니스 영어
	class TodayEnglishBusinessDAO extends Ora_BaseModel{
		private $date;
		
		public function __construct($date = ""){
			if ($date == ""){
				$this->date = date("Y-m-d");
			}
		}
		
		public function getData(){
			return array(
				"seq" => 292,
				"title" => "How many are in your party?",
				"transtitle" => "일행이 모두 몇 분이신가요?",
				"example" => "A: Good evening. How many are in your party? 
B: Four people including myself. Do you have a table somewhere quiet and preferably by the window? 
A: Very well, sir. I will be with you right away to seat you. 
B: Thank you.",
				"transexample" => "A: 안녕하세요. 일행이 모두 몇 분이신가요?
B: 저를 포함해 네 명입니다. 좀 조용하고 가급적 창가 쪽 테이블로 해 주실래요?
A: 알겠습니다, 고객님. 잠시만 기다려 주시면 바로 안내 드리겠습니다.
B: 감사합니다.",
				"content" => " 레스토랑 예약 없이 방문한 경우, `(일행이 모두 몇 분이신가요?) How many are in your party?´ 라고 묻는 표현입니다. 여기서 party는 company, 즉 ´함께 온 일행´을 뜻합니다. 그럴 때, ´본인 포함해 00명입니다.´ 라고 말하고 싶다면 간단히 00 people including myself라고 표현하면 됩니다. 참고로 preferably by the window (가급적 창가 쪽 자리)란 뜻이며, preferably 는 ´더 좋아하여, 오히려´ 란 뜻도 있지만 여기서는 ´가급적(이면)´ 이란 의미로 사용되었습니다. ",
				"mp3" => "cca292.mp3",
				"category_code" => "CK_CAFECG_031",
				"library_code" => "46",
				"view_check" => "1",
				"view_date" => "2015-11-10"
			);
		}
	}
	
	// 오늘의 영어: 오늘의 한마디
	class TodayEnglishExpressionDAO extends Ora_BaseModel{
		private $date;
		
		public function __construct($date = ""){
			if ($date == ""){
				$this->date = date("Y-m-d");
			}
		}
		
		public function getData(){
			return array(
				"seq" => 292,
				"title" => "How many are in your party? ah my god!",
				"transtitle" => "일행이 모두 몇 분이신가요?",
				"example" => "A: Good evening. How many are in your party? 
B: Four people including myself. Do you have a table somewhere quiet and preferably by the window? 
A: Very well, sir. I will be with you right away to seat you. 
B: Thank you.",
				"transexample" => "A: 안녕하세요. 일행이 모두 몇 분이신가요?
B: 저를 포함해 네 명입니다. 좀 조용하고 가급적 창가 쪽 테이블로 해 주실래요?
A: 알겠습니다, 고객님. 잠시만 기다려 주시면 바로 안내 드리겠습니다.
B: 감사합니다.",
				"content" => " 레스토랑 예약 없이 방문한 경우, `(일행이 모두 몇 분이신가요?) How many are in your party?´ 라고 묻는 표현입니다. 여기서 party는 company, 즉 ´함께 온 일행´을 뜻합니다. 그럴 때, ´본인 포함해 00명입니다.´ 라고 말하고 싶다면 간단히 00 people including myself라고 표현하면 됩니다. 참고로 preferably by the window (가급적 창가 쪽 자리)란 뜻이며, preferably 는 ´더 좋아하여, 오히려´ 란 뜻도 있지만 여기서는 ´가급적(이면)´ 이란 의미로 사용되었습니다. ",
				"mp3" => "cca292.mp3",
				"category_code" => "CK_CAFECG_031",
				"library_code" => "46",
				"view_check" => "1",
				"view_date" => "2015-11-10"
			);
		}
	}
?>
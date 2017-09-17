<?
include_once "../model/_BaseModel.php";

	// 파라메터를 이용해서 그 것과 연관된 설문조사 id를 가져온다.
	class SurveyIdFinder extends Ora_BaseModel{
		public function __construct(){
		}
		
		public function findByClassId($classid = 0){
			return 1;
		}
	}

	// 설문조사 상세 처리 Model
	class SurveyDetailDAO extends Ora_BaseModel{
		private $sc_no;
		
		public function __construct($sc_no = ""){
			$this->sc_no = $sc_no;
		}
		
		public function getData(){
			// [CK_SURVEY_CONTENT]
			$mData = array(
				"sc_no" => 1966,
				"logo_no" => 334,
				"sc_title" => "당근영어]전화영어 종료만족도 조사",
				"tp_no" => 5,
				"sc_date" => "2011-12-06",
				"sc_save" => "y",
				"sc_content" => "<P>안녕하세요.</P>
<P>당근영어 삼성문화재단 담당매니져 이하늘입니다.</P>
<P>3개월동안 진행한 전화영어과정 만족도조사를 진행하니,</P>
<P>소중한 의견주시면 다음과정에 반영하도록 하겠습니다.</P>
<P>감사합니다.</P>",
				
				"sv_start" => "2015-11-10",
				"sv_end" => "2015-11-20"
			);
			
			return $mData;
		}
	}
	
	// 설문조사 항목 목록 처리 Model
	class SurveyContentItemListDAO extends Ora_BaseModel{
		private $sc_no;
		
		public function __construct($sc_no = ""){
			$this->sc_no = $sc_no;
		}
		
		public function getData(){
			$list = array();
			
			$list[] = array(
				"sci_no" => 32001,
				"sc_no" => 1966,
				"sci_type" => 0,
				"sci_sort" => 1,
				"sci_depth" => 0,
				"sci_msg1" => "",
				"sci_msg2" => "",
				"sci_msg3" => "",
				"tp_no" => "",
				"sci_subject" => "Ⅰ. 다음은 전반적인 교육과정에 대한 내용입니다.[Program]",
				"sci_sort1" => null,
				"sci_msg4" => "",
				"sci_msg5" => ""
			);
			
			$list[] = array(
				"sci_no" => 32002,
				"sc_no" => 1966,
				"sci_type" => 0,
				"sci_sort" => 1,
				"sci_depth" => 1,
				"sci_msg1" => "",
				"sci_msg2" => "",
				"sci_msg3" => "",
				"tp_no" => "",
				"sci_subject" => " Is this course objective given clearly?
 나는 교육과정의 목표가 구체적으로 제시되었다고 생각한다.",
				"sci_sort1" => 1,
				"sci_msg4" => "",
				"sci_msg5" => ""
			);
			
			$list[] = array(
				"sci_no" => 32003,
				"sc_no" => 1966,
				"sci_type" => 0,
				"sci_sort" => 1,
				"sci_depth" => 1,
				"sci_msg1" => "",
				"sci_msg2" => "",
				"sci_msg3" => "",
				"tp_no" => "",
				"sci_subject" => "  Is the course contents organized and given systematically?
 나는 학습자료의 내용이 체계적으로 구성되고 제시되었다고 생각한다.",
				"sci_sort1" => 2,
				"sci_msg4" => "",
				"sci_msg5" => ""
			);
			
			$list[] = array(
				"sci_no" => 32004,
				"sc_no" => 1966,
				"sci_type" => 0,
				"sci_sort" => 1,
				"sci_depth" => 0,
				"sci_msg1" => "",
				"sci_msg2" => "",
				"sci_msg3" => "",
				"tp_no" => "",
				"sci_subject" => "III. 다음은 학습 성과에 대한 내용입니다.[Outcome]",
				"sci_sort1" => null,
				"sci_msg4" => "",
				"sci_msg5" => ""
			);
			
			$list[] = array(
				"sci_no" => 32005,
				"sc_no" => 1966,
				"sci_type" => 1,
				"sci_sort" => 1,
				"sci_depth" => 1,
				"sci_msg1" => "로그인 해본 적 있다.",
				"sci_msg2" => "ID와 PW는 알고 있으나, 로그인 해본 적은 없다.",
				"sci_msg3" => "ID와 PW 로그인 안내를 원한다.",
				"tp_no" => "",
				"sci_subject" => "홈페이지에서 다양한 일일컨텐츠 사용이 제공되고 있습니다.
귀하는 홈페이지ID와 PW를 알고 로그인해보신 적이 있으십니까?",
				"sci_sort1" => 1,
				"sci_msg4" => "",
				"sci_msg5" => ""
			);
			
			$list[] = array(
				"sci_no" => 32006,
				"sc_no" => 1966,
				"sci_type" => 2,
				"sci_sort" => 1,
				"sci_depth" => 1,
				"sci_msg1" => "",
				"sci_msg2" => "",
				"sci_msg3" => "",
				"tp_no" => "",
				"sci_subject" => "기타 다른 의견 바랍니다.",
				"sci_sort1" => 2,
				"sci_msg4" => "",
				"sci_msg5" => ""
			);
			
			return $list;
		}
	}



	// 설문조사 입력 처리 Model
	class SurveyInsertDAO extends Ora_BaseModel{
		private $sc_no;
		
		public function __construct($sc_no = ""){
			$this->sc_no = $sc_no;
		}
		
		public function insert(){
			
		}
	}
?>
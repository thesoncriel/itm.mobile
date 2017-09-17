<?
include "../model/TodayEnglishInfo.php";
include "../controller/_BaseController.php";
	/* TodayEnglishController
	 * Desc. 학생용 '오늘의 영어' 데이터 출력부
	 * 
	 * Parameter
	 * $date	가져오려는 오늘의 영어가 보여지는 날짜
	 * $type	가져올 데이터의 형태. b=오늘의 비즈니스 영어, e=오늘의 한마디
	 * 
	 * Return
	 * {
	 * 	todayEnglish: { // [TODAYEXPRESSION]
	 * 		seq: int				// 고유번호
	 * 		title: String			// 제목
	 * 		transtitle:	String		// 제목(해석)
	 * 		example: String			// 에제
	 * 		transexample: String	// 에졔(해석)
	 * 		content: String			// 내용
	 * 		mp3: String				// MP3 파일명
	 * 		category_code: int		// 카테고리
	 * 		library_code: String	// 라이브러리 코드
	 * 		view_check: String		// ??
	 * 		view_date: String		// 보여지는 날짜
	 * 	}
	 * 	result: {...}
	 * }
	 */	
/******************************************************************************
 * Controller Area
 ******************************************************************************/
	// 사용자 로그인 유효성 처리부 
	class TodayEnglishController extends BaseController{
		private $type = "";
		private $_date = "";
		
		public function __construct(
			$type = "", 
			$date = ""
		){
			$this->name = "todayEnglish";
			$this->type = $type;
			$this->_date = $date;
		}
		
		public function getData(){
			$dao;
			
			if ($this->type == "b"){
				$dao = new TodayEnglishBusinessDAO( $this->_date );
			}
			else{
				$dao = new TodayEnglishExpressionDAO( $this->_date );
			}
			
			return $dao->getData();
		}
	}
/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$ctrl = new TodayEnglishController($type, $date);

	echo json_encode( $ctrl->getResult() );
?>
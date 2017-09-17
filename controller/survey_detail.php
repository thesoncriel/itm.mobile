<?
include "../model/Survey.php";
include "../controller/_BaseController.php";

// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* SurveyDetailController
	 * Desc. 설문조사 상세 내용을 가져다 준다.
	 * 
	 * Parameter
	 * $sc_no		// 설문조사 ID - CK_SURVEY_CONTENT.SC_NO
	 * 
	 * Return
	 * {
	 * 	survey: {
	 * 		detail: {				// =CK_SURVEY_CONTENT
				sc_no
				logo_no
	 * 			sc_title
	 * 			tp_no
	 * 			sc_date
	 * 			sc_save
	 * 			sc_content
	 * 
	 * 			sv_start
	 * 			sv_end
	 * 		}
	 * 		itemList: [				// =CK_SURVEY_CONTENT_ITEM
	 * 			{
	 * 				sci_no
					sc_no
					sci_type
					sci_sort
					sci_depth
					sci_msg1
					sci_msg2
					sci_msg3
					tp_no
					sci_subject
					sci_sort1
					sci_msg4
					sci_msg5
	 * 			}
	 * 		]
	 * 	}
	 * 	result: {
	 * 		valid: Boolean 		// 파라메터 입력 유효성 여부
	 * 		auth: Boolean		// 보안 접근 유효성 여부 (ex: 로그인, 권한 등)
	 * 		msg: String			// 사용자에게 알려줄 메시지
	 * 		err: Any			// 에러메시지 (있을 경우)
	 * 		redirect: String	// 별도로 보내고자 하는 URL이 있을 경우 기재
	 * 	}
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 클래스 커뮤니티 목록 컨트롤러
	class SurveyDetailController extends BaseController{
		private $classid;
		private $sc_no;
		private $tutorseqid;
		private $companyno;
		
		public function __construct($sc_no = ""){
			$this->name = "survey"; // 받는 주 데이터의 명칭. ※ 반드시 설정 할 것
			//$svIdFinder = new SurveyIdFinder();
			
			//$this->classid = $classid;
			//$this->tutorseqid = $tutorseqid;
			//$this->companyno = $companyno;
			$this->sc_no = $sc_no;//$svIdFinder->findByClassId( $classid );
		}
		
		public function getSurveyDetail(){
			$dao = new SurveyDetailDAO( $this->sc_no );
			
			return $dao->getData();
		}
		public function getSurveyItemList(){
			$dao = new SurveyContentItemListDAO( $this->sc_no );
			
			return $dao->getData();
		}
		public function getData(){
			return array(
				"detail" => $this->getSurveyDetail(),
				"itemList" => $this->getSurveyItemList()
			);
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new SurveyDetailController($sc_no);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
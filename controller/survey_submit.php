<?
include "../model/Survey.php";
include "../controller/_BaseController.php";

// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* SurveySubmitController
	 * Desc. 설문조사 내역을 처리하여 입력 한다.
	 * 
	 * Parameter
	 * $sc_no		// 설문조사 ID - CK_SURVEY_CONTENT.SC_NO
	 * $ms_no		// 설문조사를 진행 한 회원 번호 - MEMBER.SEQ
	 * $email		// 설문조사 내용을 전달 할 이메일
	 * $m0 ~ $mN	// 설문조사 답변 내용
	 * 
	 * Return 
	 * {
	 * 	result: {...} 
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 클래스 커뮤니티 목록 컨트롤러
	class SurveySubmitController extends BaseController{
		private $sc_no;
		private $ms_no;
		private $email;
		
		public function __construct(
			$sc_no = "", 
			$ms_no = "", 
			$email = ""
		){
			$this->classid = $sc_no;
			$this->tutorseqid = $ms_no;
			$this->companyno = $email;
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new SurveySubmitController($classid, $tutorseqid, $companyno);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
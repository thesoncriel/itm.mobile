<?
include "../model/ClassInfo.php";
include "../controller/_BaseController.php";
	/* ClassInfoController
	 * Desc. 사용자의 클래스 출결 현황 처리부
	 * 
	 * Parameter
	 * $regid	// 강의 ID
	 * 
	 * Return
	 * {
	 * 	info: {
	 * 			book_name:	String			// 교재이름
	 * 			book_seq:	int				// 교재 SEQ ID
	 * 			classroom: String			// 강의실 이름
	 * 			survey: {
	 * 				sc_no : int				// 만족도 설문조사 ID [CK_SURVEY_CONTENT.SC_NO]
	 * 				user_involved: int		// 사용자의 만족도 조사 참여 여부. 0=참여안함, 1=참여함
	 * 				dtstart:				// 만족도 조사 설문 기간 (시작)
	 * 				dtend:					// 만족도 조사 설문 기간 (종료)
	 * 			}
	 * 			tutor: {
	 * 				memberseq: int			// 회원 SEQ ID
	 * 				tutorseq:				// 강사 SEQ ID
	 * 				memberid:				// 회원 ID
	 * 				email:					// 회원 Email
	 * 				imgfile:				// 강사 이미지
	 * 				kname:					// 성명(한글)
	 * 				ename:					// 성명(영어)
	 * 				edulang:				// 교육언어(코드)
	 * 				edulangk:				// 교육언어(한글)
	 * 				edulang1:				// 추가 교육언어 (코드 모음) - 추가 요청사항 대비
	 * 				intro_movie:			// 강사소개 (동영상)
	 * 				intro_text:				// 강사소개 (소개글)
	 * 			}
	 * 	}
	 * 	result: {...}
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 메인 컨트롤러
	class ClassInfoController extends BaseController{
		private $uid;
		private $regId;
		
		public function __construct($uid, $regId){
			$this->name = "info";
			$this->uid = $uid;
			$this->regId = $regId;
		}
		
		public function getData(){
			//$studentid = "", $classid = ""
			$dao = new ClassInfoDetailOtherDAO($this->uid, $this->regId);
			
			return $dao->getData();
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new ClassInfoController($uid, $regid);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
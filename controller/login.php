<?
include "../model/MemberInfo.php";
include "../controller/_BaseController.php";

	/* LoginController
	 * Desc. 단순 사용자 로그인 기능을 처리.
	 * 
	 * Parameter
	 * $uid		사용자ID
	 * $upass	사용자 비밀번호
	 * 
	 * Return
	 * {
	 * 	member: {
	 * 		memberseq		// 사용자 시퀀스 번호
			tutorseq		// 강사 번호
			memberid		// 사용자 ID
			email			// 사용자 Email
			imgfile			// 사용자 이미지 (강사용?)
			kname			// 성명 (국문)
			ename			// 성명 (영문)
			companyid		// 소속 회사 코드
			companyname		// 소속 회사명
			gubun			// 회원 구분 (MEMBER, TUTOR, EMP)
	 * 	}
	 * 	result: {...}
	 * }
	 */	
/******************************************************************************
 * Controller Area
 ******************************************************************************/
	// 사용자 로그인 유효성 처리부 
	class LoginController extends BaseController{
		private $uid;
		private $upass;
		
		public function __construct($uid, $upass){
			$this->name = "member";
			$this->uid = $uid;

			if ($uid == "user"){
				$this->valid = $upass == "0000";
				$_SESSION["_login"] = $uid;
			}	else if ($uid == "tutor"){
				$this->valid = $upass == "1111";
				$_SESSION["_login"] = $uid;
			}
		}
		
		public function getData(){
			//$dao = new MemberInfoDAO();
			$dao = null;
			
			// 테스트용 모델
			if ($this->uid == "user"){
				$dao = new MemberInfoDAO();
			}
			else if ($this->uid == "tutor"){// 테스트용 모델
				$dao = new MemberInfoDAO_tmp_tutor();
			}
			else{
				$this->valid = false;
				
				return null;
			}
			
			return $dao->getData();
		}
		
		public function getMsg(){
			if ($this->isValid()){
				return "로그인에 성공 하였습니다.";
			}
			else{
				return "아이디 혹은 비밀번호가 맞지 않습니다.";
			}
		}
	}
/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$ctrl = new LoginController($uid, $upass);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
<?
include_once "../model/MemberInfo.php";
include "../controller/_BaseController.php";
	/*
	 * MemberInfoController
	 * @Desc. 현재 세션에 기록된 사용자 정보를 가져온다.
	 * 
	 * @Parameter
	 * 없음
	 * 
	 * @Return
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
	 * result: {..}
	 * }
	 */	
/******************************************************************************
 * Controller Area
 ******************************************************************************/
	class MemberInfoController extends BaseController{
		private $uid = "";
		
		public function __construct($uid){
			parent::__construct();
			$this->name = "member";
			$this->uid = $uid;
		}
		
		public function isAuth(){
			return $this->auth;
		}
		
		public function getData(){
			$dao = null;
			
			if ($this->uid == "user"){
				$dao = new MemberInfoDAO( $this->uid );
			}
			else if ($this->uid == "tutor"){
				$dao = new MemberInfoDAO_tmp_tutor( $this->uid );
			}
			else{
				
				$this->auth = false;
				$this->valid = false;
				$this->msg = "Login Please.";
				$this->redirect = "/login";
				
				return null;
			}
			
			
			
			return $dao->getData();
		}
	}
	
/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = $_SESSION["_login"]; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new MemberInfoController($uid);
	
	echo json_encode( $ctrl->getResult() );
?>
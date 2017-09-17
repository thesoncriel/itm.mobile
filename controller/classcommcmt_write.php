<?
include "../model/ClassCommComment.php";
// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* ClassCommCommentWriteController
	 * Desc. 클래스 커뮤니티 게시판의 댓글을 추가 한다.
	 * 
	 * Parameter
	 * $classid		// ITM_CLASS.REGID 기준
	 * $regid		// 게시물 번호 - ITM_CLASS_BOARD.REGID
	 * 
	 * Return
	 * {
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

	// 클래스 커뮤니티 컨트롤러
	class ClassCommCommentWriteController{
		private $valid = true;
		private $auth = true;
		private $msg = "Update Success !";
		private $err = array();
		private $redirect = "";

		private $uid;
		private $classid;
		private $regid;
		private $param;
		private $lastInsertId;
		
		public function __construct($uid = "", $classid = "", $regid = "", $param){
			$this->uid = $uid;
			$this->classid = $classid;
			$this->regid = $regid;
			$this->param = $param;
		}
		
		public function insert(){
			$dao = new ClassCommCommentInsertDAO($this->classid, $this->regid, $this->param);
			$iRet = $dao->insert(); 
			$this->lastInsertId = $dao->getLastInsertId();
			
			return $iRet;
		}
		public function getLastInsertId(){
			return $this->lastInsertId;
		}
		
		public function isValid(){
			return $this->valid;
		}
		public function isAuth(){
			return $this->auth;
		}
		public function getMsg(){
			return $this->msg;
		}
		public function getErr(){
			return $this->err;
		}
		public function getRedirect(){
			return $this->redirect;
		}
		public function getResult(){
			$this->insert();
			
			$mResult = array(
				"lastInsertId" => $this->getLastInsertId(),
				"result" => array(
					"valid" 	=> $this->isValid(),
					"auth"		=> $this->isAuth(),
					"msg" 		=> $this->getMsg(),
					"err" 		=> $this->getErr(),
					"redirect" 	=> $this->getRedirect()
				)
			);

			return $mResult;
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$param = array(); // 필요한 파라메터 내역을 가져와 merge 한다.
	$ctrl = new ClassCommCommentWriteController($uid, $classid, $regid, $param);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
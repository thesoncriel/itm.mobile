<?
// 공용 기본 컨트롤러. 상속받아서 쓴다.
/*
 * Return
 * {
 * 	lastInsertId: Any		// Insert 후 최근 입력된 데이터의 고유 ID값
 * 	today: String			// 오늘 날짜 (Y-m-d)
 * 	result: {
 * 		valid: Boolean 		// 파라메터 입력 유효성 여부
 * 		auth: Boolean		// 보안 접근 유효성 여부 (ex: 로그인, 권한 등)
 * 		msg: String			// 사용자에게 알려줄 메시지
 * 		err: Any			// 에러메시지 (있을 경우)
 * 		redirect: String	// 별도로 보내고자 하는 URL이 있을 경우 기재
 * 	}
 * }
 */
	class BaseController{
		protected $name = "data";
		protected $lastInsertId = -1;
		protected $valid = true;
		protected $auth = true;
		protected $msg = "";
		protected $err = array();
		protected $redirect = "";
		
		public function __construct(){}
		public function delete(){}
		public function update(){}
		public function insert(){}
				
		public function getData(){}
		
		public function getLastInsertId(){
			return $this->lastInsertId;
		}
		public function isValid(){
			return $this->valid;
		}
		public function isAuth(){
			return $this->auth;
		}
		public function setAuth($auth){
			$this->auth = $auth;
		}
		public function getMsg(){
			return $this->msg;
		}
		public function setMsg($msg){
			$this->msg = $msg;
		}
		public function getErr(){
			return $this->err;
		}
		public function getRedirect(){
			return $this->redirect;
		}
		public function getResult(){
			$this->update();
			$this->insert();
			$this->delete();
			
			$mResult = array(
				"today" => date("Y-m-d"),
				"result" => array()
			);
			
			$mResult[ $this->name ] = $this->getData();
			$mResult[ "lastInsertId" ] = $this->getLastInsertId();
			$mResult[ "result" ][ "valid" ] = $this->isValid();
			$mResult[ "result" ][ "auth" ] = $this->isAuth();
			$mResult[ "result" ][ "msg" ] = $this->getMsg();
			$mResult[ "result" ][ "err" ] = $this->getErr();
			$mResult[ "result" ][ "redirect" ] = $this->getRedirect();
			
			return $mResult;
		}
	}
?>
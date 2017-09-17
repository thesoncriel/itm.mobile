<?
include "../model/ClassComm.php";
include "../controller/_BaseController.php";
// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* ClassCommModifyController
	 * Desc. 클래스 커뮤니티 게시판 내용을 수정 한다.
	 * 
	 * Parameter
	 * $classid		// ITM_CLASS.REGID 기준
	 * $regid		// 게시물 번호 - ITM_CLASS_BOARD.REGID
	 * $contents	// 게시물 내용
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
	class ClassCommModifyController extends BaseController{
		private $uid;
		private $classid;
		private $regid;
		private $param;
		
		public function __construct($uid = "", $classid = "", $regid = "", $param){
			$this->uid = $uid;
			$this->classid = $classid;
			$this->regid = $regid;
			$this->param = $param;
		}
		
		public function update(){
			$dao = new ClassCommUpdateDAO($this->classid, $this->regid, $this->param);
			$ret = $dao->update();
			
			if ($ret > 0){
				$this->msg = "Update Success !";
			}
			
			return $ret;
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$param = array( // 필요한 파라메터 내역을 가져와 merge 한다.
		"classid" 	=> $classid,
		"regid" 	=> $regid,
		"contents" 	=> $contents
	);
	$ctrl = new ClassCommModifyController($uid, $classid, $regid, $param);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
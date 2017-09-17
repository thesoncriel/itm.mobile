<?
include "../model/ClassCommComment.php";
include "../controller/_BaseController.php";
// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* ClassCommCommentDeleteController
	 * Desc. 클래스 커뮤니티의 특정 댓글을 삭제 한다.
	 * 
	 * Parameter
	 * $classid		// ITM_CLASS.REGID 기준
	 * $regid		// 게시물 번호 - ITM_CLASS_BOARD.REGID
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
	class ClassCommCommentDeleteController extends BaseController{
		private $uid;
		private $classid;
		private $regid;
		
		public function __construct($uid = "", $classid = "", $regid = ""){
			$this->uid = $uid;
			$this->classid = $classid;
			$this->regid = $regid;
			
			$this->msg = "Delete Success !";
		}
		
		public function delete(){
			$dao = new ClassCommCommentDeleteDAO($this->classid, $this->regid);
			
			return $dao->delete();
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new ClassCommCommentDeleteController($uid, $classid, $regid);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
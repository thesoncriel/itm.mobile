<?
include "../model/ClassComm.php";
include "../controller/_BaseController.php";
// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* ClassCommWriteController
	 * Desc. 클래스 커뮤니티 게시판 내용을 추가 한다.
	 * 
	 * Parameter
		$classid		// ITM_CLASS.REGID 기준
		$contents
		$writer
		$bcode
		$gubun
		$email
		$korname
		$engname
	 * 
	 * Return
	 * {
	 * 	result: {...}
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 클래스 커뮤니티 컨트롤러
	class ClassCommWriteController extends BaseController{
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
		
		public function insert(){
			$dao = new ClassCommInsertDAO($this->classid, $this->regid, $this->param);
			$iRet = $dao->insert(); 
			$this->lastInsertId = $dao->getLastInsertId();
			
			if ($iRet > 0){
				$this->msg = "Write Success !";
			}
			
			return $iRet;
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$dateTime = new DateTime(); 
	$param = array( // 필요한 파라메터 내역을 가져와 merge 한다.
		"contents" 		=> $contents,
		"writer" 		=> $writer,
		"createdate" 	=> $dateTime->format("Y-m-d H:i:s"),
		"bcode" 		=> $bcode,
		"gubun" 		=> $gubun,
		"email" 		=> $email,
		"korname" 		=> $korname,
		"engname" 		=> $engname,
		"topstatus" 	=> "N",
		"upfilename" 	=> "",
		"upfilesize" 	=> ""
	);
	$ctrl = new ClassCommWriteController($uid, $classid, $regid, $param);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
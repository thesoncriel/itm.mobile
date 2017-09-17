<?
include "../model/MemberInfo.php";
include "../controller/_BaseController.php";
	/* LogoutController
	 * Desc. 사용자 로그아웃을 처리
	 * 
	 * Parameter
	 * 없음
	 * 
	 * Return
	 * {
	 * 	result: {...}
	 * }
	 */	
/******************************************************************************
 * Controller Area
 ******************************************************************************/
	// 사용자 로그인 유효성 처리부 
	class LogoutController extends BaseController{
		public function __construct(){
			$this->msg = "로그아웃 하였습니다.";
		}
	}
/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$ctrl = new LogoutController();
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
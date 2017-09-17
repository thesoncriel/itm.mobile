<?
include "../model/ClassComm.php";
include "../controller/_BaseController.php";
// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* ClassCommListController
	 * Desc. 클래스 커뮤니티의 목록을 보여준다.
	 * 
	 * Parameter
	 * $classid		// ITM_CLASS.REGID 기준
	 * $page		// 가져올 데이터의 페이지
	 * $count		// 한번에 가져올 데이터의 행 수
	 * 
	 * Return
	 * {
	 * 	classComm: {
	 * 		totalcount: int		
	 * 		list : [				// =ITM_CLASS_BOARD
	 * 			{
					regid			// 게시물 ID
					contents		// 게시물 내용
					writer			// 작성자 REG ID
					createdate		// 작성일자
					bcode			// 게시물 그룹 코드 (=BOARDLIST.SEQ)
					hit				// 열람 횟수
					gubun			// 작성자 구분
					email			// 작성자 Email
					korname			// 작성자 이름(한글)
					engname			// 작성자 이름(영문)
					cmtcnt			// 댓글 개수
					topstatus		// ??
					upfilename		// 업로드된 파일명
					upfilesize		// 업로드된 파일의 사이즈
					
					writer_id		// 작성자 ID - 추가 요청사항 때문에 넣은 것. 불필요하면 빼도 됨.
					writer_imgfile	// 작성자 이미지. 게시판에서 보여야 함 (=TUTOR.IMGFILE)
	 * 			}
	 * 		]
	 * 	}
	 * 	result: {...}
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 클래스 커뮤니티 목록 컨트롤러
	class ClassCommListController extends BaseController{
		private $classid;
		private $page;
		private $count;
		
		public function __construct($classid = "", $page = 1, $count = 10){
			$this->name = "classComm";
			$this->classid = $classid;
			$this->page = $page;
			$this->count = $count;
		}
		
		public function getData(){
			$dao = new ClassCommListDAO($this->classid, $this->page, $this->count);
			
			return $dao->getData();
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new ClassCommListController($classid, $page, $count);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
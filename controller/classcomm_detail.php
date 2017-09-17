<?
include "../model/ClassComm.php";
include "../model/ClassCommComment.php";
include "../controller/_BaseController.php";
// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* ClassCommDetailController
	 * Desc. 클래스 커뮤니티의 상세를 보여 준다.
	 * 
	 * Parameter
	 * $classid		// ITM_CLASS.REGID 기준
	 * $regid		// 게시물 번호 - ITM_CLASS_BOARD.REGID
	 * 
	 * Return
	 * {
	 * 	classComm: {
	 * 		detail: {				// =ITM_CLASS_BOARD
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
	 * 		}
	 * 		commentList: [
	 * 			{
	 * 				regid		// 댓글 번호
	 * 				boardid
	 * 				contents
	 * 				writer
	 * 				createdate
	 * 				gubun
	 * 
	 * 				// ## MEMBER.SEQ = writer 를 통해 데이터 가져오기 ##
	 * 				writer_ename		// 작성자 이름 (영문)
	 * 				writer_kname		// 작성자 이름 (한글)
	 * 				writer_imgfile		// 작성자 사진 이미지 - 일반 사용자일 경우 빈 공백으로 할 것
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
	class ClassCommDetailController extends BaseController{
		private $classid;
		private $regid;
		
		public function __construct($classid = "", $regid = ""){
			$this->name = "detail";
			$this->classid = $classid;
			$this->regid = $regid;
		}
		
		public function getData(){
			$dao = new ClassCommDetailDAO($this->classid, $this->regid);
			
			return $dao->getData();
		}
		public function getClassCommCommentList(){
			$dao = new ClassCommCommentListDAO($this->classid, $this->regid);
			
			return $dao->getData();
		}
		
		// @override
		public function getResult(){
			$mResult = parent::getResult();
			$mResult["commentList"] = $this->getClassCommCommentList();

			return $mResult;
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new ClassCommDetailController($classid, $regid);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
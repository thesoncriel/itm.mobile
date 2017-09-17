<?
	include_once "../model/_BaseModel.php";

	// 클래스 커뮤니티 - 댓글 목록 Model
	class ClassCommCommentListDAO extends Ora_BaseModel{
		private $classid;
		private $regid;
		
		public function __construct($classid = "", $regid){
			$this->classid = $classid;
			$this->regid = $regid;
		}
		
		public function getData(){
			$mData = array(
				 "regid" => 13,
				 "boardid" => 111,
				 "contents" => "It's My Comment!!. It’s a distraction, certainly, Clinton said. “But it hasn’t in any way affected the plan for our campaign.",
				 "writer" => 454,
				 "createdate" => "2015-11-11 오후 4:54:55",
				 "gubun" => "MEMBER",
				 
				 "writer_ename" => "Jonathan",
				 "writer_kname" => "이은혜",
				 "writer_imgfile" => ""
			);
			
			$list = array();
			
			for($i = 0; $i < 10; $i++){
				$list[] = $mData;
				// 테스트용 인덱스
				$list[$i]["writer_ename"] = $list[$i]["writer_ename"] . " %%" . ($i + 1) . "%%";
			}
			
			return $list;
		}
	}
	
	
	
	// 클래스 커뮤니티 댓글 추가 처리 Model
	class ClassCommCommentInsertDAO extends Ora_BaseModel{
		private $classid;
		private $regid;
		private $param;
		private $lastInsertId;
		
		public function __construct($classid = "", $regid, $param){
			$this->classid = $classid;
			$this->regid = $regid;
			$this->param = $param;
		}
		
		public function insert(){
			$this->lastInsertId = 4444;
			
			return 1;
		}
		
		public function getLastInsertId(){
			return $this->lastInsertId;
		}
	}

	// 클래스 커뮤니티 댓글 삭제 처리 Model
	class ClassCommCommentDeleteDAO extends Ora_BaseModel{
		private $classid;
		private $regid;
		
		public function __construct($classid = "", $regid){
			$this->classid = $classid;
			$this->regid = $regid;
		}
		
		public function delete(){
			return 1;
		}
	}
	
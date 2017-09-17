<?
include_once "../model/_BaseModel.php";

	// 클래스 커뮤니티 목록 처리 Model
	class ClassCommListDAO extends Ora_BaseModel{
		private $classid;
		private $page;
		private $count;
		
		public function __construct($classid = "", $page = 1, $count = 10){
			$this->classid = $classid;
			$this->page = $page;
			$this->count = $count;
		}
		
		public function getTotalCount(){
			return 345;
		}
		
		public function getData(){
			$mData = array(
				"regid" => 101,
				"contents" => "I am happy to join with you today in what will go down in history as the greatest demonstration for freedom in the history of our nation. [Applause]

Five score years ago, a great American, in whose symbolic shadow we stand signed the Emancipation Proclamation. This momentous decree came as a great beacon light of hope to millions of Negro slaves who had been seared in the flames of withering injustice. It came as a joyous daybreak to end the long night of captivity.

But one hundred years later, we must face the tragic fact that the Negro is still not free. One hundred years later, the life of the Negro is still sadly crippled by the manacles of segregation and the chains of discrimination. One hundred years later, the Negro lives on a lonely island of poverty in the midst of a vast ocean of material prosperity. One hundred years later, the Negro is still languishing in the corners of American society and finds himself an exile in his own land. So we have come here today to dramatize an appalling condition.

In a sense we have come to our nation’s capital to cash a check. When the architects of our republic wrote the magnificent words of the Constitution and the declaration of Independence, they were signing a promissory note to which every American was to fall heir. This note was a promise that all men would be guaranteed the inalienable rights of life, liberty, and the pursuit of happiness.",
				"writer" => 1444,
				"createdate" => "2015-11-11 14:23",
				"bcode" => 444,
				"hit" => 3,
				"gubun" => "TUTOR",
				"email" => "materking@gmail.com",
				"korname" => "마틴 루터 킹",
				"engname" => "Martin Luther King",
				"cmtcnt" => 9,
				"topstatus" => "N",
				"upfilename" => "",
				"upfilesize" => "",
				
				"writer_id" => "materking",
				"writer_imgfile" => "100830133638702.jpg"
			);
			
			$list = array();
			
			for($i = 0; $i < 10; $i++){
				$list[] = $mData;
				
				$list[$i]["regid"] += $i;
			}
			
			return array(
				"totalcount" => $this->getTotalCount(),
				"list" => $list
			);
		}
	}



	// 클래스 커뮤니티 상세 처리 Model
	class ClassCommDetailDAO extends Ora_BaseModel{
		private $classid;
		private $regid;
		
		public function __construct($classid = "", $regid){
			$this->classid = $classid;
			$this->regid = $regid;
		}
		
		public function getData(){
			$mData = array(
				"regid" => 101,
				"contents" => "I am happy to join with you today in what will go down in history as the greatest demonstration for freedom in the history of our nation. [Applause]

Five score years ago, a great American, in whose symbolic shadow we stand signed the Emancipation Proclamation. This momentous decree came as a great beacon light of hope to millions of Negro slaves who had been seared in the flames of withering injustice. It came as a joyous daybreak to end the long night of captivity.

But one hundred years later, we must face the tragic fact that the Negro is still not free. One hundred years later, the life of the Negro is still sadly crippled by the manacles of segregation and the chains of discrimination. One hundred years later, the Negro lives on a lonely island of poverty in the midst of a vast ocean of material prosperity. One hundred years later, the Negro is still languishing in the corners of American society and finds himself an exile in his own land. So we have come here today to dramatize an appalling condition.

In a sense we have come to our nation’s capital to cash a check. When the architects of our republic wrote the magnificent words of the Constitution and the declaration of Independence, they were signing a promissory note to which every American was to fall heir. This note was a promise that all men would be guaranteed the inalienable rights of life, liberty, and the pursuit of happiness.",
				"writer" => 1444,
				"createdate" => "2015-11-11 14:23",
				"bcode" => 444,
				"hit" => 3,
				"gubun" => "TUTOR",
				"email" => "materking@gmail.com",
				"korname" => "마틴 루터 킹",
				"engname" => "Martin Luther King",
				"cmtcnt" => 9,
				"topstatus" => "N",
				"upfilename" => "",
				"upfilesize" => "",
				
				"writer_id" => "materking",
				"writer_imgfile" => "100830133638702.jpg"
			);
			
			return $mData;
		}
	}


	// 클래스 커뮤니티 추가 처리 Model
	class ClassCommInsertDAO extends Ora_BaseModel{
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
			$this->lastInsertId = 789;
			
			return 1;
		}
		
		public function getLastInsertId(){
			return $this->lastInsertId;
		}
	}

	// 클래스 커뮤니티 삭제 처리 Model
	class ClassCommDeleteDAO extends Ora_BaseModel{
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
	
	// 클래스 커뮤니티 수정 처리 Model
	class ClassCommUpdateDAO extends Ora_BaseModel{
		private $classid;
		private $regid;
		private $param;
		
		public function __construct($classid = "", $regid, $param){
			$this->classid = $classid;
			$this->regid = $regid;
			$this->param = $param;
		}
		
		public function update(){
			return 1;
		}
	}

?>
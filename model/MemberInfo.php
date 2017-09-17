<?
include "../model/_BaseModel.php";

	class MemberInfoDAO extends Ora_BaseModel{
		public function __construct($uid = ""){
			
		}
		
		public function getData(){
			return array(
				"memberseq" => 44,
				"tutorseq" => 0,
				"memberid" => "theson",
				"email" => "theson@paran.com",
				"imgfile" => "100312171753825.jpg",
				"kname" => "강백호",
				"ename" => "Jhon Kang",
				"companyid" => 1111,
				"companyname" => "(주)온세통신",
				"gubun" => "MEMBER"
			);
		}
	}
	
	// Tutor 테스트용 멤버
	class MemberInfoDAO_tmp_tutor extends Ora_BaseModel{
		public function __construct($uid = ""){
			
		}
		
		public function getData(){
			return array(
				"memberseq" => 554,
				"tutorseq" => 669,
				"memberid" => "yotimer",
				"email" => "thesonr@edunet4u.net",
				"imgfile" => "100312171753825.jpg",
				"kname" => "수왕기",
				"ename" => "Tom Sang",
				"companyid" => 1111,
				"companyname" => "달묘전설",
				"gubun" => "TUTOR"
			);
		}
	}
?>
<?
include_once "../model/_BaseModel.php";

	// 클래스 목록 처리 Model
	class ClassInfoListDAO extends Ora_BaseModel{
		public function __construct($uid, $count, $page){
			
		}
		
		public function getData(){
			$mData = array(
				"regid" => 110,
				"classname" => "[아모레퍼시픽 리테일]_고급아이오페",
				"classno" => 1,
				"companyname" => "아모레퍼시픽 Travel Retail",
				"sdate" => "2015-10-01",
				"edate" => "2015-11-30",
				"stimegubun" => "AM",
				"stimehh" => "6",
				"stimemm" => "0",
				"etimegubun" => "PM",
				"etimehh" => "6",
				"etimemm" => "30",
				"cdaysmo" => "Y",
				"cdaystu" => "",
				"cdayswe" => "Y",
				"cdaysth" => "Y",
				"cdaysfr" => "Y",
				"cdayssa" => "",
				"cdayssu" => "",
				"boardseq" => 110,
				"course_completion" => "95",
				"attendance_rate" => 78,
				
				"boardcount" => 32
			);
			
			$list = array();
			
			for($i = 0; $i < 10; $i++){
				$list[] = $mData;
			}
			
			return array(
				"current_classes" => 109,
				"total_class_completion" => 98,
				"totalcount" => 110,
				"list" => $list
			);
		}
	}
	
	// 클래스 상세 처리 Model
	class ClassInfoDetailDAO extends Ora_BaseModel{
		public function __construct($uid = ""){
			
		}
		
		public function getData(){
			$mData = array(
				"regid" => 110,
				"classname" => "[아모레퍼시픽 리테일]_고급아이오페",
				"classno" => 1,
				"companyname" => "아모레퍼시픽 Travel Retail",
				"sdate" => "2015-10-01",
				"edate" => "2015-11-30",
				"stimegubun" => "AM",
				"stimehh" => "6",
				"stimemm" => "0",
				"etimegubun" => "PM",
				"etimehh" => "6",
				"etimemm" => "30",
				"cdaysmo" => "Y",
				"cdaystu" => "",
				"cdayswe" => "Y",
				"cdaysth" => "Y",
				"cdaysfr" => "Y",
				"cdayssa" => "",
				"cdayssu" => "",
				"boardseq" => 110,
				"course_completion" => "95",
				"attend_rate" => "78"
			);
			
			return $mData;
		}
	}
	
	class ClassInfoDetailOtherDAO extends Ora_BaseModel{
		public function __construct($studentid = "", $classid = ""){
			
		}
		public function getEduLang(&$mCode, $edulang1){
			
		}
		public function findMediaType($fileName){
			$aFileName = explode(".", $fileName);
			$fileext = $aFileName[ count($aFileName) - 1 ];
			$sFileExt = strtolower($fileext);
			
			switch($sFileExt){
				case "mp4":
					return "video/mp4";
				
			}
			
			return "";
		}
		public function getSatisSurveyData(){
			return array(
				"seq" => 111,
				"user_involved" => 0,
				"dtstart" => "2015-08-11",
				"dtend" => "2015-11-11",
			);
		}
		public function getTutorData(){
			$codeMaster = new CodeMasterLangCode();
			$mCode = $codeMaster->getData();
			$mData = array(
				"memberseq" => 44,
				"tutorseq" => 0,
				"memberid" => "theson",
				"email" => "theson@paran.com",
				"imgfile" => "100312171753825.jpg",
				"kname" => "강백호",
				"ename" => "Jhon Kang",
				"edulang" => "2601",
				"edulang1" => "2607, 2611",
				"intro_movie" => "other.mp4",
				"intro_text" => '
    “Oh My God!!! Not at all. It’s a distraction, certainly,” Clinton said. “But it hasn’t in any way affected the plan for our campaign, the efforts we’re making to organize here in Iowa and elsewhere in the country. And I still feel very confident about the organization and the message that my campaign is putting out.” ',
				
				"sc_no" => 666
			);
			
			$mData[ "edulangk" ] = $mCode[ $mData[ "edulang" ] ];
			$mData[ "intro_movie_mediatype" ] = $this->findMediaType( $mData[ "intro_movie" ] );
			
			return $mData;
		}
		public function getData(){
			$mData = array(
				"book_name" => "Pre Pre get up wakeup! 1",
				"book_seq" => 434,
				"classroom" => "판교 44사옥 공통",
				"survey" => $this->getSatisSurveyData(),
				"tutor" => $this->getTutorData() 
			);
			
			return $mData;
		}
	}
	
	// 클래스 출결 현황 Model
	class ClassAttendListDAO extends Ora_BaseModel{
		public function __construct($studentid = "", $classid = ""){
			
		}
		
		public function getData(){
			$aList = array();
			$mData0 = array(
				"regid" => 1860155,
				"classid" => 14916,
				"status" => 0,
				"date" => "2015-11-21",
			);
			$mData1 = array(
				"regid" => 1860155,
				"classid" => 14916,
				"status" => 1,
				"date" => "2015-11-24",
			);
			$mData2 = array(
				"regid" => 1860155,
				"classid" => 14916,
				"status" => 2,
				"date" => "2015-11-30",
			);
			
			$aList[] = $mData0;
			$aList[] = $mData1;
			$aList[] = $mData2;
			
			return $aList;
		}
	}
	
	// 클래스 강의 계획서 Model
	class ClassPlansDetailDAO extends Ora_BaseModel{
		public function __construct($classid = ""){
			
		}
		
		// ITM_LESSIONPLAN
		public function getLessonPlan(){
			$mData = array(
				"seq" => 10,
				"classid" => 2633,
				"title" => "This is My Life~",
				"courseobj" => "Advanced Business English !!",
				"timemng1" => 5,
				"timemng2" => 7,
				"timemng3" => 19,
				"timemng4" => 24,
				"timemng5" => 10,
				"timemng6" => 1.09,
			);
			
			return $mData;
		}
		
		// ITM_LESSIONPLAN_WEEK
		public function getLessonPlanWeek(){
			$aData = array();
			
			$aData[] = array(
				"seq" => 1,
				"planseq" => 44,
				"mainbook" => "unit1",
				"submaterial" => "Idoms & Articles
This is My Life!
by Bonjovi"
			);
			
			$aData[] = array(
				"seq" => 2,
				"planseq" => 44,
				"mainbook" => "unit2",
				"submaterial" => "Idoms & Articles Fire!"
			);
			
			$aData[] = array(
				"seq" => 3,
				"planseq" => 44,
				"mainbook" => "unit3",
				"submaterial" => "Idoms & Articles Answer?"
			);
			
			return $aData;
		}
		
		public function getData(){
			return array(
				"lessonPlan" => $this->getLessonPlan(),
				"lessonPlanWeek" => $this->getLessonPlanWeek()
			);
		}
	}
	
	
	// 클래스 월별 평가서 Model
	class ClassReportDetailDAO extends Ora_BaseModel{
		private $studentid;
		private $classid;
		private $yearMonth;
		
		public function __construct($studentid = "", $classid = "", $yearMonth = ""){
			$this->studentid = $studentid;
			$this->classid = $classid;
			$this->yearMonth = $yearMonth;
		}
		
		public function getLanguageCompetency(){
			return array(
				array(
					"category" => "Fluency",
					"value" => 10
				),
				array(
					"category" => "Accuracy",
					"value" => 9
				),
				array(
					"category" => "Compreghension",
					"value" => 6
				),
				array(
					"category" => "Pronunciation",
					"value" => 8
				)
			);
		}
		public function getClassEffort(){
			return array(
				array(
					"category" => "Participation",
					"value" => 700
				),
				array(
					"category" => "Preparation",
					"value" => 1100
				)
			);
		}
		public function getCurrentStatus(){
			return array(
				array(
					"category" => "Fluency",
					"value" => 80,
					"value2" => 30
				),
				array(
					"category" => "Accuracy",
					"value" => 85,
					"value2" => 35
				),
				array(
					"category" => "Listening",
					"value" => 70,
					"value2" => 40
				),
				array(
					"category" => "Comprehend",
					"value" => 90,
					"value2" => 20
				),
				array(
					"category" => "Attitude",
					"value" => 100,
					"value2" => 25
				)
			);
		}
		public function getAccumulativeRecording(){
			return array(
				array(
					"category" => "09-01",
					"value" => 41,
					"value2" => 40,
					"value3" => 35,
					"value4" => 34,
					"value5" => 33
				),
				array(
					"category" => "09-11",
					"value" => 41,
					"value2" => 40,
					"value3" => 35,
					"value4" => 34,
					"value5" => 33
				),
				array(
					"category" => "09-21",
					"value" => 41,
					"value2" => 40,
					"value3" => 35,
					"value4" => 34,
					"value5" => 33
				),
				array(
					"category" => "09-30",
					"value" => 41,
					"value2" => 40,
					"value3" => 35,
					"value4" => 34,
					"value5" => 33
				),
				array(
					"category" => "10-10",
					"value" => 41,
					"value2" => 40,
					"value3" => 35,
					"value4" => 37,
					"value5" => 34
				)
			);
		}
		
		public function getData(){
			$cm = new CodeMasterLevelCode();
			$mCm = $cm->getData();
			
			$mData = array(
				"memberseqid" => 44,
				"name" => "장나라",
				"evaluator" => "Erik Johnson",
				"evaluatorid" => 114,
				"result_curr" => 60,
				"result_goal" => 160,
				"levelcode" => 1405,
				"overall_feedback" => "학생님~~은 
현재 볼륨 1의 10과를 함께 공부하고 있습니다. 
5월 중에 볼륨 2를 공부하게 될 건데요 기초가 가장 중요하니깐 볼륨 2를 공부하더라도 볼륨 1의 내용을 mp3를 계속 들으시길 바랍니다.",
				
				"lang_comp" => $this->getLanguageCompetency(),
				"class_eff" => $this->getClassEffort(),
				"curr_stat" => $this->getCurrentStatus(),
				"accu_recd" => $this->getAccumulativeRecording()
			);
			
			$mData["level"] = $mCm[ $mData["levelcode"] ];
			
			return $mData;
		}
	}


/*
 * TUTOR - class 정보
 */
// Y:출석, N:결석,BZ:출장, VA:휴가, C:수업취소
// 
	// 클래스 출결 현황 Model
	class ClassAttendListByDateDAO extends Ora_BaseModel{
		public function __construct($classid = "", $datestart){
			
		}
		
		public function getData(){
			$aList = array();
			$aList[] = array(
				"regid" => 1860155,
				"classid" => 14916,
				"memberseq" => 110,
				"membername" => "김유신",
				"memberimg" => "",
				"status" => "Y",
				"date" => "2015-11-30"
			);
			$aList[] = array(
				"regid" => 1860155,
				"classid" => 14916,
				"memberseq" => 111,
				"membername" => "유신박",
				"memberimg" => "",
				"status" => "Y",
				"date" => "2015-11-30"
			);
			$aList[] = array(
				"regid" => 1860155,
				"classid" => 14916,
				"memberseq" => 112,
				"membername" => "고영욱",
				"memberimg" => "",
				"status" => "N",
				"date" => "2015-11-30"
			);
			
			$aList[] = array(
				"regid" => 1860155,
				"classid" => 14916,
				"memberseq" => 110,
				"membername" => "김유신",
				"memberimg" => "",
				"status" => "N",
				"date" => "2015-12-01"
			);
			$aList[] = array(
				"regid" => 1860155,
				"classid" => 14916,
				"memberseq" => 111,
				"membername" => "유신박",
				"memberimg" => "",
				"status" => "Y",
				"date" => "2015-12-01"
			);
			$aList[] = array(
				"regid" => 1860155,
				"classid" => 14916,
				"memberseq" => 112,
				"membername" => "고영욱",
				"memberimg" => "",
				"status" => "C",
				"date" => "2015-12-01"
			);
			
			$aList[] = array(
				"regid" => 1860155,
				"classid" => 14916,
				"memberseq" => 110,
				"membername" => "김유신",
				"memberimg" => "",
				"status" => "BZ",
				"date" => "2015-12-02"
			);
			$aList[] = array(
				"regid" => 1860155,
				"classid" => 14916,
				"memberseq" => 111,
				"membername" => "유신박",
				"memberimg" => "",
				"status" => "VA",
				"date" => "2015-12-02"
			);
			$aList[] = array(
				"regid" => 1860155,
				"classid" => 14916,
				"memberseq" => 112,
				"membername" => "고영욱",
				"memberimg" => "",
				"status" => "Y",
				"date" => "2015-12-02"
			);
			
			return $aList;
		}
	}
?>
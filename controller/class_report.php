<?
include "../model/ClassInfo.php";
include "../controller/_BaseController.php";
// notepad++ 에서 정규식으로 뒤의 값 없애기
// \"\s+.+\,*
	/* ClassReportController
	 * Desc. 사용자의 클래스 강의 계획서 처리 컨트롤
	 * 
	 * Parameter
	 * $regid	// 강의 ID
	 * $year_month	// 연월 (ex: '2015-10') - 없거나 빈 스트링이면 올해 이번달을 기본값으로 가짐.
	 * 
	 * Return
	 * {
	 * 	report: {
			memberseqid
			name
			evaluator
			evaluatorid
			result_curr
			result_goal
			level
			overall_feedback
			
	 		// 아래는 그래프 데이터
			lang_comp: [		// Ⅰ. Language Competency
	 * 			{
	 * 				category:	Fluency, Accuracy, Compreghension, Pronunciation 중 하나
	 * 				value:		0 ~ 10 ?
	 * 			}
	 * 		] 	
			class_eff: [		// Ⅱ. Class Effort
	 * 			{
	 * 				category:	Participation, Preparation 중 하나
	 * 				value:		0 ~ N ?
	 * 			}
	 * 		] 	
			curr_stat: [		// Graph Ⅰ. Current Status
	 * 			{
	 * 				category:	Fluency, Accuracy, Listening, Comprehend, Attitude 중 하나
	 * 				value:		Score
	 * 				value2:		Average
	 * 			}
	 * 		]
			accu_recd: [		// Graph Ⅱ. Accumulative Recording
	 * 			{
	 * 				category:	날짜. 약 2주간에 걸친 데이터 - 기획 변경 되었을 수도 있음. (모바일에서 길이가 길면 잘리니 월-일 만 줄 것)
	 * 				value:		Fluency
	 * 				value2:		Accuracy
	 * 				value3:		Listening
	 * 				value4:		Comprehension
	 * 				value5:		Attitude
	 * 			}
	 * 		]
	 * 	},
	 * 	result: {...}
	 * }
	 */
/******************************************************************************
 * Controller Area
 ******************************************************************************/

	// 메인 컨트롤러
	class ClassReportController extends BaseController{
		private $uid;
		private $regId;
		private $yearMonth;
		
		public function __construct($uid, $regId, $yearMonth = ""){
			$this->name = "report";
			$this->regId = $regId;
			$this->uid = $uid;
			
			// 자릿수가 7자리 (ex: '2015-01') 면 설정, 아니면 기본값(이번년도 이번달)으로 설정 한다.
			if (strlen( $yearMonth ) == 7){
				$this->yearMonth = $yearMonth;
			}
			else{
				$this->yearMonth = date("Y-m");
			}
		}
		
		public function getData(){
			$dao = new ClassReportDetailDAO($this->uid, $this->regId, $this->yearMonth);
			
			return $dao->getData();
		}
	}

/******************************************************************************
 * Execution Area
 ******************************************************************************/
	$uid = ""; // 세션에서 로그인한 내역을 이용한다.
	$ctrl = new ClassReportController($uid, $regid, $year_month);
	
	//print_r($login);
	
	echo json_encode( $ctrl->getResult() );
?>
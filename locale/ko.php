<?
// 로케일 기능 설정부 - 한글
function __getItmLocale_KO(){
	return array(
// 로케일 기능 설정부[시작]
// 여기다 아래 예시처럼 작성 해 준다.
"login.invalid" 	=> "아이디 혹은 비밀번호가 유효하지 않습니다.",
"login.fail" 		=> "아이디 혹은 비밀번호가 맞지 않습니다.",
"login.success" 	=> "로그인에 성공 하였습니다.",
"login.lost" 		=> "서버와의 연결이 끊어졌습니다. 다시 로그인 해 주십시요.",

"logout.confirm"	=> "로그아웃 하시겠습니까?",
"logout"			=> "로그아웃 되었습니다.",

"memberinfo.bysession.fail"	=> "접근 권한이 없습니다.",
"member.modify.passnotequal"=> "새 비밀번호가 서로 일치하지 않습니다.",
"member.modify.invalid"		=> "비밀번호가 유효하지 않습니다. 비밀번호를 다시 확인하여 주십시요.",
"member.modify.confirm"		=> "회원 정보를 수정 하시겠습니까?",
"member.modify.success"		=> "변경이 완료 되었습니다.",
"access.denied"		=> "접근이 거부 되었습니다.",
"access.invalid"	=> "잘못된 접근 입니다.",

"input.invalid"		=> "잘못된 입력입니다.",

"idsearch.invalid"	=> "이름과 이메일이 유효하지 않습니다.\r\n해당 내용을 다시 확인하여 주십시요.",
"idsearch.success.prefix"	=> "당신의 ID는 ",
"idsearch.success.suffix"	=> " 입니다.",

"pwsearch.success.prefix"	=> "'",
"pwsearch.success.suffix"	=> "'의 임시 비밀번호가 이메일로 발급 되었습니다. 확인 바랍니다.",
"pwsearch.invalid"	=> "입력 정보가 잘못 되었습니다.\r\n확인하고 다시 시도 해 주십시요.",

"class.list.notexist"		=> "클래스가 존재하지 않습니다.",

"classcomm.list.count"		=> "게시글",
"classcomm.delete.confirm"	=> "정말 삭제 하시겠습니까?",
"classcomm.delete.success"	=> "삭제 되었습니다.",
"classcomm.update.auth"		=> "수정 권한이 없습니다.",
"classcomm.update.confirm"	=> "정말 수정 하시겠습니까?",
"classcomm.update.success"	=> "수정 되었습니다.",
"classcomm.write.confirm"	=> "게시물 작성을 완료 하시겠습니까?",
"classcomm.write.success"	=> "게시물이 작성 되었습니다.",

"classcommcmt.delete.success"	=> "댓글이 삭제 되었습니다.",
"classcommcmt.write.success"	=> "댓글이 작성 되었습니다.",

"survey.err.notexist"	=> "해당 설문이 존재하지 않습니다.",
"survey.err0"			=> "설문에 참여 하실 수 없습니다.",
"survey.err1"			=> "설문은 1회만 답변 할 수 있습니다.",
"survey.err2"			=> "설문기간이 아닙니다.",
"survey.err.unknown"		=> "알 수 없는 오류 입니다.",
"survey.submit.confirm"		=> "설문조사를 완료 하시겠습니까?",
"survey.submit.success"		=> "설문조사가 완료 되었습니다.\r\n참여해 주셔서 감사합니다.",
"survey.submit.fail"		=> "설문조사에 실패 하였습니다.",


// 강사용
"tutor.class.today.delete.fail"	=> "삭제 권한이 없거나 실패 했습니다.",
"tutor.class.today.delete.success"	=> "해당 내역이 삭제 되었습니다.",
"tutor.class.today.write.success"	=> "작성이 완료 되었습니다.",

"tutor.ev.write.confirm"	=> "작성 하시겠습니까?",
"tutor.ev.write.success"	=> "작성 되었습니다.",
"tutor.ev.write.complete"	=> "EV 작성이 완료 되었습니다.",
"tutor.ev.modify.success"	=> "수정 되었습니다.",
"tutor.ev.sendmail.confirm"	=> "이 내역을 이메일로 발송 하시겠습니까?",
"tutor.ev.sendmail.success"	=> "이메일이 발송 되었습니다.",

"tutor.jobpos.apply.err1"	=> "권한이 부족합니다.",
"tutor.jobpos.apply.err2"	=> "이미 신청 되었습니다.",
"tutor.jobpos.apply.err3"	=> "신청 기한이 만료 되었습니다.",
"tutor.jobpos.apply.confirm"	=> "신청 하시겠습니까?",
"tutor.jobpos.apply.success"	=> "신청이 접수 되었습니다.",

"tutor.schedule.write.confirm"	=> "스케줄을 작성 하시겠습니까?",
"tutor.schedule.write.success"	=> "스케줄이 작성 되었습니다.",

"end" => ""
// 로케일 기능 설정부[종료]	
	);
}

?>
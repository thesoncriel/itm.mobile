<?
include_once "../locale/en.php";
include_once "../locale/ko.php";

	class LocaleInformer{
		private $locale;
		private $dic;
		
		public function __construct($locale){
			$this->setLocale($locale);
		}
		
		public function get($key){
			return $this->dic[ $key ];
		}
		
		public function getLocale(){
			return $this->locale;
		}
		
		public function setLocale($locale){
			$this->locale = $locale;
			
			switch($locale){
				case "EN":
					$this->dic = __getItmLocale_EN();
					break;
				default:
					$this->dic = __getItmLocale_KO();
					break;
			}
		}
		
		public function getJson(){
			return json_encode( $this->dic );
		}
		
		public function __destruct(){
			unset( $this->locale );
			unset( $this->dic ); 
		}
	}
?>
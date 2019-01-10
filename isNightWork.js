/*
* Функция проверки проведения работ ночю - попадание периода проведения работ в ночные периоды с 20:00 до 8:00
* 10-01-2019 11:30 МСК
* @param startDate, endDate - дата/время начала/окончания (период) проведения работ в формате строки или (instanceof Date)
*/
function isNightWork(startDate, endDate) {
	startDate = new Date(startDate);
	endDate = new Date(endDate);
	if ( !(startDate instanceof Date && !isNaN(startDate.valueOf()))
	      || !(endDate instanceof Date && !isNaN(endDate.valueOf())) )
	       throw new Error('invalid arguments');
	if (startDate >= endDate) throw new Error('startDate must be less than endDate');

	// если начали в одном дне, а закончили уже на следующий, то точно работали ночью - разница в днях больше нуля
	if (parseInt((Math.abs(startDate-endDate))/(24*3600*1000)) > 0) return true;
	
	// разница в днях не больше нуля - работали в одном дне, тогда
	// если начали между полуночью и 8 утра, то точно работали ночью
	if (0 <= startDate.getHours() && startDate.getHours() < 8) return true;
	// если закончили между 20:00 и до 0 часов, то точно работали ночью
	if (19 < endDate.getHours() && endDate.getHours() <= 23) return true;

	// все остальные случаи - дневная работа
	return false;
}

// тесты
// дата начала позже даты конца true
isNightWork('2019-01-02 16:23:00', '2019-01-01 16:23:00');
// работали в разные дни: true
isNightWork('2019-01-01 13:23:00', '2019-01-02 16:23:00');
isNightWork('2019-01-01 12:23:00', '2019-03-02 16:23:00');

// работали в один день
// начали в 0 закончили до 8 true
isNightWork('2019-01-01 00:00:00', '2019-01-01 07:23:00');
// начали в 0 закончили в 23:59:59 true
isNightWork('2019-01-01 00:00:00', '2019-01-01 23:59:59');
// начали в 0 закончили в 8 true
isNightWork('2019-01-01 00:00:00', '2019-01-01 08:00:00');
// начали до 8 и закончили до 8 true
isNightWork('2019-01-01 00:01:00', '2019-01-01 07:59:59');
// начали до 8 закончили после 8 но до 20 true
isNightWork('2019-01-01 00:01:00', '2019-01-01 09:59:59');
// начали в 8 закончили после 8 но до 20 false
isNightWork('2019-01-01 08:01:00', '2019-01-01 09:59:59');
// начали в 8 закончили после 20 но до 23:59:59 true
isNightWork('2019-01-01 08:00:00', '2019-01-01 23:59:58');

(() => {
const DRAW_ROWS = [{"expect":"2026328","openCode":"15,21,31,05,12,47,06"},{"expect":"2026327","openCode":"21,49,07,41,46,36,45"},{"expect":"2026326","openCode":"09,16,22,36,05,47,23"},{"expect":"2026325","openCode":"41,37,10,01,27,17,03"},{"expect":"2026324","openCode":"19,04,14,12,21,34,43"},{"expect":"2026323","openCode":"33,08,02,09,15,41,47"},{"expect":"2026322","openCode":"47,31,43,17,08,30,07"},{"expect":"2026321","openCode":"15,45,23,08,47,49,41"},{"expect":"2026320","openCode":"14,17,32,34,24,46,20"},{"expect":"2026319","openCode":"06,03,15,13,25,45,05"},{"expect":"2026318","openCode":"10,36,02,09,26,37,38"},{"expect":"2026317","openCode":"31,49,30,22,43,24,26"},{"expect":"2026316","openCode":"14,04,10,46,45,49,03"},{"expect":"2026315","openCode":"06,09,25,27,33,22,48"},{"expect":"2026314","openCode":"13,26,09,37,34,44,31"},{"expect":"2026313","openCode":"33,39,45,15,07,20,43"},{"expect":"2026312","openCode":"31,46,04,43,32,15,38"},{"expect":"2026311","openCode":"32,40,49,14,19,16,34"},{"expect":"2026310","openCode":"37,11,34,02,40,44,46"},{"expect":"2026309","openCode":"34,39,18,46,04,38,13"},{"expect":"2026308","openCode":"25,16,28,08,06,40,46"},{"expect":"2026307","openCode":"48,38,49,09,13,03,42"},{"expect":"2026306","openCode":"39,13,28,09,14,32,15"},{"expect":"2026305","openCode":"31,49,29,44,18,40,26"},{"expect":"2026304","openCode":"23,24,10,43,13,36,21"},{"expect":"2026303","openCode":"08,28,40,03,38,49,17"},{"expect":"2026302","openCode":"10,02,14,13,11,12,45"},{"expect":"2026301","openCode":"27,41,23,11,02,43,17"},{"expect":"2026300","openCode":"01,29,23,17,18,42,38"},{"expect":"2026299","openCode":"12,19,28,32,05,42,23"},{"expect":"2026298","openCode":"31,36,40,34,37,43,08"},{"expect":"2026297","openCode":"27,40,25,26,33,09,13"},{"expect":"2026296","openCode":"14,43,26,45,03,31,23"},{"expect":"2026295","openCode":"22,28,33,17,13,47,25"},{"expect":"2026294","openCode":"29,43,10,02,34,27,28"},{"expect":"2026293","openCode":"38,10,48,49,13,09,05"},{"expect":"2026292","openCode":"39,10,18,23,16,04,36"},{"expect":"2026291","openCode":"32,10,41,38,22,02,17"},{"expect":"2026290","openCode":"08,09,17,15,07,02,40"},{"expect":"2026289","openCode":"12,29,19,28,47,34,38"},{"expect":"2026288","openCode":"14,48,05,17,46,21,25"},{"expect":"2026287","openCode":"19,47,38,35,06,17,08"},{"expect":"2026286","openCode":"37,49,28,08,29,01,24"},{"expect":"2026285","openCode":"46,45,43,39,20,40,19"},{"expect":"2026284","openCode":"04,35,22,48,03,18,32"},{"expect":"2026283","openCode":"35,08,15,06,21,01,18"},{"expect":"2026282","openCode":"44,03,37,46,29,20,23"},{"expect":"2026281","openCode":"22,19,21,32,48,38,10"},{"expect":"2026280","openCode":"01,26,28,29,03,05,15"},{"expect":"2026279","openCode":"29,32,47,38,06,26,10"},{"expect":"2026278","openCode":"06,40,24,29,44,01,02"},{"expect":"2026277","openCode":"41,23,14,31,13,32,11"},{"expect":"2026276","openCode":"02,21,17,40,11,24,14"},{"expect":"2026275","openCode":"42,49,04,47,14,43,17"},{"expect":"2026274","openCode":"12,16,32,05,39,36,33"},{"expect":"2026273","openCode":"30,03,25,28,06,17,05"},{"expect":"2026272","openCode":"43,15,04,06,32,36,02"},{"expect":"2026271","openCode":"25,02,05,22,20,31,35"},{"expect":"2026270","openCode":"39,34,20,24,17,06,19"},{"expect":"2026269","openCode":"19,40,36,05,38,16,22"},{"expect":"2026268","openCode":"48,34,11,21,19,36,40"},{"expect":"2026267","openCode":"16,20,25,22,09,41,40"},{"expect":"2026266","openCode":"38,42,37,29,45,18,08"},{"expect":"2026265","openCode":"05,46,40,23,26,44,49"},{"expect":"2026264","openCode":"10,06,08,31,22,24,21"},{"expect":"2026263","openCode":"44,28,03,02,24,13,09"},{"expect":"2026262","openCode":"38,22,33,47,36,07,30"},{"expect":"2026261","openCode":"06,25,43,46,29,47,24"},{"expect":"2026260","openCode":"25,26,44,32,06,48,20"},{"expect":"2026259","openCode":"43,33,49,36,19,30,22"},{"expect":"2026258","openCode":"03,23,21,35,05,19,46"},{"expect":"2026257","openCode":"08,46,47,39,27,45,07"},{"expect":"2026256","openCode":"40,15,09,37,07,03,01"},{"expect":"2026255","openCode":"36,22,06,47,39,11,44"},{"expect":"2026254","openCode":"26,44,35,06,16,10,02"},{"expect":"2026253","openCode":"05,35,15,28,13,49,16"},{"expect":"2026252","openCode":"33,41,43,13,06,48,22"},{"expect":"2026251","openCode":"09,06,11,25,08,45,30"},{"expect":"2026250","openCode":"10,06,39,47,37,17,14"},{"expect":"2026249","openCode":"41,22,13,36,26,29,23"},{"expect":"2026248","openCode":"43,26,49,39,14,27,20"},{"expect":"2026247","openCode":"03,09,43,29,46,04,40"},{"expect":"2026246","openCode":"22,24,19,10,20,01,30"},{"expect":"2026245","openCode":"22,23,14,02,13,38,18"},{"expect":"2026244","openCode":"09,14,03,17,33,40,46"},{"expect":"2026243","openCode":"42,17,12,46,09,24,21"},{"expect":"2026242","openCode":"29,35,46,32,13,31,09"},{"expect":"2026241","openCode":"29,45,27,21,42,41,49"},{"expect":"2026240","openCode":"02,34,22,26,28,37,27"},{"expect":"2026239","openCode":"47,43,34,17,22,07,05"},{"expect":"2026238","openCode":"35,44,23,04,07,21,17"},{"expect":"2026237","openCode":"47,36,14,06,41,25,12"},{"expect":"2026236","openCode":"26,35,42,09,14,17,11"},{"expect":"2026235","openCode":"27,26,35,17,44,21,32"},{"expect":"2026234","openCode":"25,30,37,19,07,17,39"},{"expect":"2026233","openCode":"18,41,05,49,04,34,07"},{"expect":"2026232","openCode":"29,10,17,04,46,20,42"},{"expect":"2026231","openCode":"39,46,23,11,08,13,20"},{"expect":"2026230","openCode":"28,26,47,14,49,10,16"},{"expect":"2026229","openCode":"11,07,15,13,33,16,38"},{"expect":"2026228","openCode":"38,26,08,06,29,18,23"},{"expect":"2026227","openCode":"23,24,29,07,13,31,16"},{"expect":"2026226","openCode":"01,11,29,38,04,33,17"},{"expect":"2026225","openCode":"07,34,27,10,19,38,01"},{"expect":"2026224","openCode":"25,19,08,49,18,36,09"},{"expect":"2026223","openCode":"21,43,01,38,29,44,23"},{"expect":"2026222","openCode":"49,14,47,27,18,38,26"},{"expect":"2026221","openCode":"24,14,18,48,46,28,01"},{"expect":"2026220","openCode":"27,39,04,12,38,25,48"},{"expect":"2026219","openCode":"31,41,07,08,29,22,43"},{"expect":"2026218","openCode":"02,13,47,38,46,23,17"},{"expect":"2026217","openCode":"34,12,11,30,42,07,26"},{"expect":"2026216","openCode":"18,41,32,44,36,45,37"},{"expect":"2026215","openCode":"19,38,30,13,01,11,14"},{"expect":"2026214","openCode":"29,30,27,38,43,31,04"},{"expect":"2026213","openCode":"09,05,12,22,01,15,35"},{"expect":"2026212","openCode":"43,32,16,39,19,27,06"},{"expect":"2026211","openCode":"13,12,39,37,38,08,01"},{"expect":"2026210","openCode":"40,37,15,17,42,48,49"},{"expect":"2026209","openCode":"44,05,39,14,21,22,08"},{"expect":"2026208","openCode":"07,48,40,35,23,28,19"},{"expect":"2026207","openCode":"09,40,26,23,44,13,31"},{"expect":"2026206","openCode":"09,49,37,03,40,35,47"},{"expect":"2026205","openCode":"30,17,39,12,11,28,03"},{"expect":"2026204","openCode":"11,12,17,26,10,07,05"},{"expect":"2026203","openCode":"12,11,31,03,44,37,25"},{"expect":"2026202","openCode":"21,15,25,47,13,45,40"},{"expect":"2026201","openCode":"46,28,19,38,31,25,32"},{"expect":"2026200","openCode":"43,46,05,32,35,29,39"},{"expect":"2026199","openCode":"17,49,42,45,05,38,36"},{"expect":"2026198","openCode":"48,35,45,21,12,24,07"},{"expect":"2026197","openCode":"40,19,30,48,44,28,08"},{"expect":"2026196","openCode":"03,37,24,10,41,19,39"},{"expect":"2026195","openCode":"46,23,39,04,09,19,25"},{"expect":"2026194","openCode":"30,21,22,15,04,34,26"},{"expect":"2026193","openCode":"02,49,25,11,45,29,09"},{"expect":"2026192","openCode":"27,30,45,08,01,37,25"},{"expect":"2026191","openCode":"19,43,39,24,16,26,29"},{"expect":"2026190","openCode":"46,14,19,37,48,29,16"},{"expect":"2026189","openCode":"45,12,37,20,38,43,15"},{"expect":"2026188","openCode":"38,05,19,10,14,01,16"},{"expect":"2026187","openCode":"23,12,36,38,27,22,01"},{"expect":"2026186","openCode":"17,29,22,01,05,38,23"},{"expect":"2026185","openCode":"18,35,09,41,12,30,36"},{"expect":"2026184","openCode":"44,24,11,36,25,20,01"},{"expect":"2026183","openCode":"23,09,46,37,42,03,24"},{"expect":"2026182","openCode":"15,23,09,45,24,39,41"},{"expect":"2026181","openCode":"17,29,06,34,47,15,19"},{"expect":"2026180","openCode":"14,10,37,30,49,19,21"},{"expect":"2026179","openCode":"10,11,26,06,31,09,15"},{"expect":"2026178","openCode":"26,46,22,44,31,17,18"},{"expect":"2026177","openCode":"19,21,05,01,02,44,14"},{"expect":"2026176","openCode":"30,31,02,36,38,15,10"},{"expect":"2026175","openCode":"07,19,30,29,28,25,26"},{"expect":"2026174","openCode":"15,08,34,13,28,21,41"},{"expect":"2026173","openCode":"39,06,16,40,13,19,26"},{"expect":"2026172","openCode":"28,34,42,37,45,08,44"},{"expect":"2026171","openCode":"24,38,40,31,42,46,28"},{"expect":"2026170","openCode":"27,46,06,38,20,34,03"},{"expect":"2026169","openCode":"44,37,30,08,40,22,24"},{"expect":"2026168","openCode":"27,11,24,05,40,33,15"},{"expect":"2026167","openCode":"23,03,40,39,07,11,19"},{"expect":"2026166","openCode":"20,15,01,04,21,28,06"},{"expect":"2026165","openCode":"11,47,09,49,02,01,03"},{"expect":"2026164","openCode":"46,04,38,12,03,02,21"},{"expect":"2026163","openCode":"39,08,10,33,07,41,37"},{"expect":"2026162","openCode":"23,41,24,26,33,07,32"},{"expect":"2026161","openCode":"36,40,42,19,34,46,08"},{"expect":"2026160","openCode":"08,16,26,01,29,30,02"},{"expect":"2026159","openCode":"12,04,28,17,20,46,39"},{"expect":"2026158","openCode":"43,48,03,01,12,23,16"},{"expect":"2026157","openCode":"43,25,11,31,17,10,40"},{"expect":"2026156","openCode":"31,16,11,03,37,12,01"},{"expect":"2026155","openCode":"21,37,46,13,40,47,07"},{"expect":"2026154","openCode":"46,28,42,31,23,34,41"},{"expect":"2026153","openCode":"01,38,33,28,06,40,41"},{"expect":"2026152","openCode":"34,47,16,36,44,01,45"},{"expect":"2026151","openCode":"27,15,29,42,20,41,31"},{"expect":"2026150","openCode":"11,04,22,25,44,19,09"},{"expect":"2026149","openCode":"28,30,44,45,04,20,27"},{"expect":"2026148","openCode":"28,24,31,23,04,27,48"},{"expect":"2026147","openCode":"29,40,06,18,31,10,13"},{"expect":"2026146","openCode":"11,30,20,19,05,16,42"},{"expect":"2026145","openCode":"36,43,25,32,37,18,05"},{"expect":"2026144","openCode":"47,31,29,33,22,26,43"},{"expect":"2026143","openCode":"13,26,18,32,02,33,44"},{"expect":"2026142","openCode":"45,15,26,21,18,35,23"},{"expect":"2026141","openCode":"43,08,17,02,34,32,33"},{"expect":"2026140","openCode":"13,10,42,04,46,34,16"},{"expect":"2026139","openCode":"41,45,48,01,36,30,24"},{"expect":"2026138","openCode":"38,22,06,24,20,46,49"},{"expect":"2026137","openCode":"24,20,32,05,19,07,26"},{"expect":"2026136","openCode":"01,14,24,17,15,12,48"},{"expect":"2026135","openCode":"08,35,09,20,18,47,30"},{"expect":"2026134","openCode":"24,46,40,44,22,49,37"},{"expect":"2026133","openCode":"38,14,23,01,26,44,07"},{"expect":"2026132","openCode":"48,11,20,44,39,35,30"},{"expect":"2026131","openCode":"12,40,21,32,01,25,07"},{"expect":"2026130","openCode":"41,26,09,11,05,25,29"},{"expect":"2026129","openCode":"34,07,40,21,17,25,41"},{"expect":"2026128","openCode":"25,46,02,07,45,42,37"},{"expect":"2026127","openCode":"14,08,27,03,07,29,45"},{"expect":"2026126","openCode":"15,09,05,03,01,10,49"},{"expect":"2026125","openCode":"16,19,07,30,38,39,31"},{"expect":"2026124","openCode":"46,05,10,17,12,22,39"},{"expect":"2026123","openCode":"39,23,49,17,42,44,46"},{"expect":"2026122","openCode":"18,23,15,22,25,45,01"},{"expect":"2026121","openCode":"45,21,35,48,06,20,44"},{"expect":"2026120","openCode":"18,24,07,23,48,20,06"},{"expect":"2026119","openCode":"38,18,32,22,30,40,11"},{"expect":"2026118","openCode":"38,37,22,46,49,40,08"},{"expect":"2026117","openCode":"45,02,46,33,19,07,16"},{"expect":"2026116","openCode":"15,46,16,10,48,33,22"},{"expect":"2026115","openCode":"21,16,25,29,08,07,04"},{"expect":"2026114","openCode":"45,41,10,01,36,25,30"},{"expect":"2026113","openCode":"42,22,15,17,32,49,02"},{"expect":"2026112","openCode":"15,19,30,07,44,10,09"},{"expect":"2026111","openCode":"24,23,21,41,38,33,01"},{"expect":"2026110","openCode":"40,03,43,29,45,19,30"},{"expect":"2026109","openCode":"38,07,19,24,43,08,16"},{"expect":"2026108","openCode":"06,30,26,14,48,40,45"},{"expect":"2026107","openCode":"35,10,41,43,34,06,49"},{"expect":"2026106","openCode":"31,48,05,11,46,40,22"},{"expect":"2026105","openCode":"32,44,17,19,11,36,28"},{"expect":"2026104","openCode":"20,45,39,49,03,48,01"},{"expect":"2026103","openCode":"34,03,01,30,39,04,06"},{"expect":"2026102","openCode":"47,03,32,46,39,36,20"},{"expect":"2026101","openCode":"22,08,02,34,20,12,39"},{"expect":"2026100","openCode":"24,45,04,32,03,48,33"},{"expect":"2026099","openCode":"10,32,22,18,28,17,12"},{"expect":"2026098","openCode":"24,08,03,14,32,49,17"},{"expect":"2026097","openCode":"28,08,44,26,29,46,11"},{"expect":"2026096","openCode":"35,37,26,05,25,15,43"},{"expect":"2026095","openCode":"15,39,01,38,21,48,35"},{"expect":"2026094","openCode":"16,25,04,28,43,38,17"},{"expect":"2026093","openCode":"13,18,26,47,48,04,40"},{"expect":"2026092","openCode":"46,42,25,47,38,19,06"},{"expect":"2026091","openCode":"08,17,32,05,42,24,37"},{"expect":"2026090","openCode":"48,29,20,17,37,08,36"},{"expect":"2026089","openCode":"26,44,34,05,21,22,49"},{"expect":"2026088","openCode":"16,46,18,10,12,42,27"},{"expect":"2026087","openCode":"17,01,21,29,47,02,26"},{"expect":"2026086","openCode":"15,36,14,24,26,34,12"},{"expect":"2026085","openCode":"14,13,27,33,06,20,19"},{"expect":"2026084","openCode":"07,24,02,05,20,31,16"},{"expect":"2026083","openCode":"46,08,23,36,30,01,05"},{"expect":"2026082","openCode":"03,21,33,37,41,25,27"},{"expect":"2026081","openCode":"04,36,14,15,35,41,17"},{"expect":"2026080","openCode":"21,18,17,48,09,42,03"},{"expect":"2026079","openCode":"49,34,06,20,04,43,35"},{"expect":"2026078","openCode":"18,17,10,33,02,08,46"},{"expect":"2026077","openCode":"37,32,46,25,39,30,29"},{"expect":"2026076","openCode":"12,07,24,22,03,41,02"},{"expect":"2026075","openCode":"19,22,26,20,41,27,33"},{"expect":"2026074","openCode":"12,31,49,25,24,32,10"},{"expect":"2026073","openCode":"07,29,01,33,36,14,34"},{"expect":"2026072","openCode":"12,28,01,42,25,44,46"},{"expect":"2026071","openCode":"44,30,25,05,41,08,48"},{"expect":"2026070","openCode":"47,17,23,10,41,07,25"},{"expect":"2026069","openCode":"23,16,10,34,08,36,24"},{"expect":"2026068","openCode":"49,02,01,26,38,21,23"},{"expect":"2026067","openCode":"15,30,06,01,26,09,05"},{"expect":"2026066","openCode":"24,20,36,44,02,28,37"},{"expect":"2026065","openCode":"02,45,17,38,33,24,05"},{"expect":"2026064","openCode":"08,23,40,44,34,02,18"},{"expect":"2026063","openCode":"36,26,37,02,44,31,28"},{"expect":"2026062","openCode":"46,29,06,49,35,42,24"},{"expect":"2026061","openCode":"46,17,08,25,02,37,29"},{"expect":"2026060","openCode":"05,27,40,34,39,01,09"},{"expect":"2026059","openCode":"29,19,24,43,28,12,10"},{"expect":"2026058","openCode":"20,38,13,21,33,40,31"},{"expect":"2026057","openCode":"21,29,40,30,26,34,23"},{"expect":"2026056","openCode":"45,09,06,07,10,26,48"},{"expect":"2026055","openCode":"31,28,20,21,39,09,14"},{"expect":"2026054","openCode":"37,30,11,19,49,32,48"},{"expect":"2026053","openCode":"16,12,33,17,41,18,15"},{"expect":"2026052","openCode":"15,46,14,13,40,35,38"},{"expect":"2026051","openCode":"40,42,44,06,14,38,01"},{"expect":"2026050","openCode":"10,13,30,37,33,44,23"},{"expect":"2026049","openCode":"28,42,22,49,12,31,13"},{"expect":"2026048","openCode":"08,38,29,32,46,16,24"},{"expect":"2026047","openCode":"40,35,23,42,46,47,39"},{"expect":"2026046","openCode":"13,09,20,22,39,36,03"},{"expect":"2026045","openCode":"20,38,22,13,42,27,01"},{"expect":"2026044","openCode":"46,17,39,47,48,38,19"},{"expect":"2026043","openCode":"09,35,42,40,33,03,13"},{"expect":"2026042","openCode":"38,22,17,19,01,18,16"},{"expect":"2026041","openCode":"02,08,17,44,32,27,36"},{"expect":"2026040","openCode":"46,06,29,27,11,49,28"},{"expect":"2026039","openCode":"31,20,08,29,10,04,11"},{"expect":"2026038","openCode":"06,40,49,34,12,20,42"},{"expect":"2026037","openCode":"34,42,39,13,44,45,43"},{"expect":"2026036","openCode":"44,39,11,20,27,48,01"},{"expect":"2026035","openCode":"32,47,44,36,19,41,27"},{"expect":"2026034","openCode":"38,45,35,24,30,23,19"},{"expect":"2026033","openCode":"14,22,46,33,08,11,41"},{"expect":"2026032","openCode":"23,17,11,20,10,39,06"},{"expect":"2026031","openCode":"38,25,07,19,11,05,26"},{"expect":"2026030","openCode":"03,06,47,01,35,04,41"},{"expect":"2026029","openCode":"47,08,05,04,03,18,01"},{"expect":"2026028","openCode":"17,47,28,39,32,49,03"},{"expect":"2026027","openCode":"11,16,46,10,18,49,45"},{"expect":"2026026","openCode":"44,34,24,13,37,42,19"},{"expect":"2026025","openCode":"46,10,41,06,09,14,37"},{"expect":"2026024","openCode":"10,45,25,15,23,44,28"},{"expect":"2026023","openCode":"06,29,36,38,18,31,47"},{"expect":"2026022","openCode":"39,08,20,37,46,30,18"},{"expect":"2026021","openCode":"47,45,33,07,24,10,42"},{"expect":"2026020","openCode":"09,37,14,47,11,24,12"},{"expect":"2026019","openCode":"42,22,45,19,07,25,46"},{"expect":"2026018","openCode":"40,42,43,31,25,15,39"},{"expect":"2026017","openCode":"44,18,31,41,33,02,32"},{"expect":"2026016","openCode":"34,12,48,26,40,38,06"},{"expect":"2026015","openCode":"10,08,30,20,15,33,31"},{"expect":"2026014","openCode":"38,13,12,08,43,31,26"},{"expect":"2026013","openCode":"09,19,44,27,37,06,01"},{"expect":"2026012","openCode":"25,26,33,20,41,45,11"},{"expect":"2026011","openCode":"32,10,07,05,48,15,11"},{"expect":"2026010","openCode":"23,38,24,49,11,30,27"},{"expect":"2026009","openCode":"17,18,06,49,07,22,28"},{"expect":"2026008","openCode":"05,39,36,19,29,45,21"},{"expect":"2026007","openCode":"28,40,45,34,44,15,41"},{"expect":"2026006","openCode":"35,41,15,06,46,21,13"},{"expect":"2026005","openCode":"46,19,20,36,13,17,43"},{"expect":"2026004","openCode":"22,19,07,35,49,36,45"},{"expect":"2026003","openCode":"30,44,07,15,42,17,09"},{"expect":"2026002","openCode":"48,07,04,03,15,11,22"},{"expect":"2026001","openCode":"27,08,43,33,42,11,29"}];
function parseDraws(rows) {
  if (!Array.isArray(rows)) throw new Error('数据必须是记录数组。');
  const issues = new Set();
  return rows.map((row) => {
    const match = /^2026(\d{3})$/.exec(row?.expect);
    const parts = typeof row?.openCode === 'string' ? row.openCode.split(',') : [];
    const numbers = parts.map((part) => Number(part));
    if (!match || parts.length !== 7 || parts.some((part) => !/^\d{2}$/.test(part)) || numbers.some((number) => number < 1 || number > 49) || new Set(numbers).size !== 7 || issues.has(row.expect)) {
      throw new Error(`记录格式有误：${row?.expect ?? '未知期号'}`);
    }
    issues.add(row.expect);
    return { issue: Number(match[1]), numbers };
  });
}

function summarize(draws, start, end) {
  const selected = draws.filter(({ issue }) => issue >= start && issue <= end);
  const counts = Array.from({ length: 49 }, (_, index) => ({ number: index + 1, all: 0, last: 0 }));
  for (const { numbers } of selected) {
    for (const number of numbers) counts[number - 1].all++;
    counts[numbers[6] - 1].last++;
  }
  return { drawCount: selected.length, counts };
}

// 并列（recent 与 overall 都相同）时用确定性的伪随机哈希打破平局，避免系统性地偏向小号
function tieKey(number) {
  return (Math.imul(number, 2654435761) ^ Math.imul(number, 40503)) >>> 0;
}

function exclusionCandidates(draws, size, window = 20) {
  if (![5, 7, 12].includes(size)) throw new Error('候选数量必须是 5、7 或 12。');
  const history = [...draws].sort((a, b) => a.issue - b.issue);
  const recent = history.slice(-window);
  const overall = Array(49).fill(0);
  const recentCounts = Array(49).fill(0);
  for (const { numbers } of history) for (const number of numbers) overall[number - 1]++;
  for (const { numbers } of recent) for (const number of numbers) recentCounts[number - 1]++;
  return Array.from({ length: 49 }, (_, index) => ({
    number: index + 1,
    recent: recentCounts[index],
    overall: overall[index],
    key: tieKey(index + 1),
  })).sort((a, b) => a.recent - b.recent || a.overall - b.overall || a.key - b.key).slice(0, size);
}

function backtestExclusions(draws, size, minimumHistory = 50) {
  const ordered = [...draws].sort((a, b) => a.issue - b.issue);
  let correct = 0;
  let avoided = 0;
  const tested = Math.max(0, ordered.length - minimumHistory);
  for (let i = minimumHistory; i < ordered.length; i++) {
    const candidates = exclusionCandidates(ordered.slice(0, i), size);
    const numbers = ordered[i].numbers;
    if (candidates.every(({ number }) => !numbers.includes(number))) correct++;
    avoided += candidates.reduce((sum, { number }) => sum + (numbers.includes(number) ? 0 : 1), 0);
  }
  const baseline = Array.from({ length: 7 }, (_, index) => (49 - size - index) / (49 - index))
    .reduce((product, term) => product * term, 1);
  const rate = tested ? correct / tested : 0;
  const se = tested ? Math.sqrt(baseline * (1 - baseline) / tested) : 0;
  const z = se ? (rate - baseline) / se : 0;
  const instances = tested * size;
  return {
    tested,
    correct,
    rate,
    baseline,
    se,
    z,
    perNumberRate: instances ? avoided / instances : 0,
    perNumberBaseline: 42 / 49,
  };
}

function adjacentOverlap(draws) {
  const ordered = [...draws].sort((a, b) => a.issue - b.issue);
  const histogram = Array(8).fill(0);
  const overlaps = [];
  let specialRepeat = 0;
  for (let index = 1; index < ordered.length; index++) {
    const previous = ordered[index - 1].numbers;
    overlaps.push(ordered[index].numbers.filter((number) => previous.includes(number)).length);
    histogram[overlaps.at(-1)]++;
    if (ordered[index].numbers.includes(previous[6])) specialRepeat++;
  }
  let afterZeroTests = 0;
  let afterZeroNoRepeat = 0;
  for (let index = 1; index < overlaps.length; index++) {
    if (overlaps[index - 1] === 0) {
      afterZeroTests++;
      if (overlaps[index] === 0) afterZeroNoRepeat++;
    }
  }
  const latest = ordered.at(-1);
  const previous = ordered.at(-2);
  return {
    latest,
    previous,
    repeated: latest && previous ? latest.numbers.filter((number) => previous.numbers.includes(number)) : [],
    histogram,
    pairs: overlaps.length,
    specialRepeat,
    specialBaseline: 7 / 49,
    afterZeroTests,
    afterZeroNoRepeat,
    baselineNoRepeat: Array.from({ length: 7 }, (_, index) => (42 - index) / (49 - index))
      .reduce((product, term) => product * term, 1),
  };
}

// —— 生肖与五行（2026 年为马年）——
// 49 个号码按 12 生肖循环分配：01 为当年生肖（马），往前依次为蛇、龙、兔……；
// 每差 12 号归入同一生肖。五行配色：鼠/猪=水，牛/龙/羊/狗=土，虎/兔=木，蛇/马=火，猴/鸡=金。
const ZODIAC_ORDER = ['马', '蛇', '龙', '兔', '虎', '牛', '鼠', '猪', '狗', '鸡', '猴', '羊'];
const ZODIAC_ELEMENT = { 鼠: '水', 牛: '土', 虎: '木', 兔: '木', 龙: '土', 蛇: '火', 马: '火', 羊: '土', 猴: '金', 鸡: '金', 狗: '土', 猪: '水' };

function zodiacFor(number) {
  return ZODIAC_ORDER[(number - 1) % 12];
}

function zodiacElement(zodiac) {
  return ZODIAC_ELEMENT[zodiac] || '';
}



const $ = (id) => document.getElementById(id);
const formatNumber = (value) => String(value).padStart(2, '0');
const ELEMENT_CLASS = { 金: 'metal', 木: 'wood', 水: 'water', 火: 'fire', 土: 'earth' };
function numberBall(number, cls = 'number-badge') {
  const zodiac = zodiacFor(number);
  const element = zodiacElement(zodiac);
  return `<span class="${cls} el-${ELEMENT_CLASS[element]}" title="${zodiac} · ${element}"><span class="n">${formatNumber(number)}</span><span class="z">${zodiac}</span></span>`;
}
const state = { draws: [], sort: 'number', descending: false, size: 12 };

function renderRecommendation() {
  if (!state.draws.length) return;
  const maxIssue = Math.max(...state.draws.map(({ issue }) => issue));
  const candidates = exclusionCandidates(state.draws, state.size);
  const result = backtestExclusions(state.draws, state.size);
  $('target-issue').textContent = `2026${String(maxIssue + 1).padStart(3, '0')}`;
  $('candidate-count').textContent = state.size;
  $('candidate-list').innerHTML = candidates.map(({ number }) => numberBall(number, 'candidate-ball')).join('');
  $('candidate-evidence').innerHTML = candidates.map(({ number, recent, overall }) =>
    `<tr><td>${numberBall(number)}</td><td>${recent} 次</td><td>${overall} 次</td></tr>`
  ).join('');
  $('backtest-result').textContent = `${result.correct} / ${result.tested} 期`;
  $('backtest-rate').textContent = `${(result.rate * 100).toFixed(1)}%`;
  $('random-rate').textContent = `${(result.baseline * 100).toFixed(1)}%`;
  $('per-number-rate').textContent = `${(result.perNumberRate * 100).toFixed(1)}%`;
  $('per-number-baseline').textContent = `${(result.perNumberBaseline * 100).toFixed(1)}%`;
  $('z-score').textContent = Number.isFinite(result.z) ? result.z.toFixed(2) : '--';
  $('significance').textContent = significanceLabel(result.z);
  document.querySelectorAll('.size-button').forEach((button) => {
    const selected = Number(button.dataset.size) === state.size;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function renderOverlap() {
  const result = adjacentOverlap(state.draws);
  if (!result.previous) return;
  const issueLabel = (issue) => `2026${String(issue).padStart(3, '0')}`;
  $('overlap-current-issue').textContent = issueLabel(result.latest.issue);
  $('overlap-previous-issue').textContent = issueLabel(result.previous.issue);
  $('overlap-current-numbers').textContent = result.latest.numbers.map(formatNumber).join(' · ');
  $('overlap-previous-numbers').textContent = result.previous.numbers.map(formatNumber).join(' · ');
  $('overlap-current-count').textContent = `${result.repeated.length} 个`;
  $('overlap-current-list').textContent = result.repeated.length ? result.repeated.map(formatNumber).join('、') : '没有重号';
  $('overlap-zero-count').textContent = `${result.histogram[0]} / ${result.pairs}`;
  $('overlap-zero-rate').textContent = `${(result.histogram[0] / result.pairs * 100).toFixed(1)}%`;
  $('overlap-any-count').textContent = `${result.pairs - result.histogram[0]} / ${result.pairs}`;
  $('overlap-after-zero').textContent = `${result.afterZeroNoRepeat} / ${result.afterZeroTests}`;
  $('overlap-after-zero-rate').textContent = `${(result.afterZeroNoRepeat / result.afterZeroTests * 100).toFixed(1)}%`;
  $('overlap-random-rate').textContent = `${(result.baselineNoRepeat * 100).toFixed(1)}%`;
  $('overlap-special-rate').textContent = `${(result.specialRepeat / result.pairs * 100).toFixed(1)}%`;
  $('overlap-special-random').textContent = `${(result.specialBaseline * 100).toFixed(1)}%`;
}

function renderCurrentHeat() {
  const latest = [...state.draws].sort((a, b) => b.issue - a.issue)[0];
  if (!latest) return;
  const first = Math.min(...state.draws.map(({ issue }) => issue));
  const all = summarize(state.draws, first, latest.issue).counts;
  const recent = summarize(state.draws, Math.max(first, latest.issue - 19), latest.issue).counts;
  const selected = latest.numbers.map((number) => ({ number, all: all[number - 1].all, recent: recent[number - 1].all, last: all[number - 1].last }));
  const hottest = [...selected].sort((a, b) => b.all - a.all || a.number - b.number)[0];
  $('heat-issue').textContent = `2026${String(latest.issue).padStart(3, '0')}`;
  $('heat-total-draws').textContent = state.draws.length;
  $('heat-top-number').textContent = formatNumber(hottest.number);
  $('heat-top-count').textContent = hottest.all;
  $('heat-rows').innerHTML = selected.map(({ number, all: total, recent: last20, last }, index) =>
    `<tr${index === 6 ? ' class="special-row"' : ''}><td>${numberBall(number)}${index === 6 ? '<span class="special-tag">本期末位</span>' : ''}</td><td><strong>${total}</strong> 次</td><td><strong>${last20}</strong> 次</td><td><strong>${last}</strong> 次</td></tr>`
  ).join('');
}

function renderColdNumbers() {
  const issues = state.draws.map(({ issue }) => issue);
  if (!issues.length) return;
  const first = Math.min(...issues);
  const latest = Math.max(...issues);
  const { counts } = summarize(state.draws, first, latest);
  const cold = [...counts].sort((a, b) => a.all - b.all || a.number - b.number).slice(0, 20);
  $('cold-list').innerHTML = cold.map(({ number, all }) =>
    `<div class="cold-item">${numberBall(number)}<span class="cold-count">${all} 次</span></div>`
  ).join('');
}

function showError(message) {
  $('error').textContent = message;
  $('error').hidden = false;
}

function hideError() { $('error').hidden = true; }

function significanceLabel(z) {
  if (!Number.isFinite(z)) return '';
  const abs = Math.abs(z);
  if (abs >= 1.96) return z > 0 ? '显著优于随机（p < 0.05）' : '显著劣于随机（p < 0.05）';
  return '与随机无显著差异（p ≥ 0.05）';
}

function rankMarkup(rows, key, max) {
  return [...rows].sort((a, b) => b[key] - a[key] || a.number - b.number).slice(0, 5).map((row, index) =>
    `<div class="rank-row"><span class="rank">${String(index + 1).padStart(2, '0')}</span><span class="rank-number">${formatNumber(row.number)}</span><span class="track"><span class="fill ${key === 'last' ? 'last' : ''}" style="width:${max ? row[key] / max * 100 : 0}%"></span></span><span class="rank-count">${row[key]}</span></div>`
  ).join('');
}

function render() {
  if (!state.draws.length) return;
  const start = Number($('issue-start').value);
  const end = Number($('issue-end').value);
  const maxIssue = Math.max(...state.draws.map(({ issue }) => issue));
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end > maxIssue || start > end) {
    showError(`请输入有效期号范围：1 至 ${maxIssue}，起始期号不能大于结束期号。`);
    return;
  }
  const query = $('search').value.trim();
  if (query && (!/^\d{1,2}$/.test(query) || Number(query) < 1 || Number(query) > 49)) {
    showError('查找号码请输入 01 至 49。');
    return;
  }
  hideError();
  const { drawCount, counts } = summarize(state.draws, start, end);
  const allMax = Math.max(...counts.map((row) => row.all));
  const lastMax = Math.max(...counts.map((row) => row.last));
  const top = [...counts].sort((a, b) => b.all - a.all || a.number - b.number)[0];
  $('draw-count').textContent = drawCount.toLocaleString('zh-CN');
  $('all-count').textContent = (drawCount * 7).toLocaleString('zh-CN');
  $('last-count').textContent = drawCount.toLocaleString('zh-CN');
  $('issue-range').textContent = `2026${String(start).padStart(3, '0')} – 2026${String(end).padStart(3, '0')}`;
  $('top-number').textContent = drawCount ? formatNumber(top.number) : '--';
  $('top-count').textContent = drawCount ? `${top.all} 次` : '无记录';

  const ordered = counts.filter((row) => !query || row.number === Number(query)).sort((a, b) => {
    const diff = a[state.sort] - b[state.sort];
    return (state.descending ? -diff : diff) || a.number - b.number;
  });
  $('number-rows').innerHTML = ordered.map((row) => `<tr><td class="number">${numberBall(row.number)}</td><td class="bar-cell"><div class="bar-line"><span class="value">${row.all}</span><span class="track"><span class="fill" style="width:${allMax ? row.all / allMax * 100 : 0}%"></span></span></div></td><td class="bar-cell"><div class="bar-line"><span class="value">${row.last}</span><span class="track"><span class="fill last" style="width:${lastMax ? row.last / lastMax * 100 : 0}%"></span></span></div></td></tr>`).join('');
  $('all-rank').innerHTML = rankMarkup(counts, 'all', allMax);
  $('last-rank').innerHTML = rankMarkup(counts, 'last', lastMax);
}

document.querySelectorAll('.sort').forEach((button) => button.addEventListener('click', () => {
  const key = button.dataset.sort;
  state.descending = state.sort === key ? !state.descending : key !== 'number';
  state.sort = key;
  document.querySelectorAll('.sort').forEach((item) => {
    item.classList.toggle('active', item === button);
    item.querySelector('.sort-mark').textContent = item === button ? (state.descending ? '↓' : '↑') : '';
  });
  render();
}));

document.querySelectorAll('.size-button').forEach((button) => button.addEventListener('click', () => {
  state.size = Number(button.dataset.size);
  renderRecommendation();
}));

['issue-start', 'issue-end', 'search'].forEach((id) => $(id).addEventListener('input', render));
$('reset').addEventListener('click', () => {
  $('issue-start').value = 1;
  $('issue-end').value = Math.max(...state.draws.map(({ issue }) => issue));
  $('search').value = '';
  render();
});

const API_URL = 'https://history.macaumarksix.com/history/macaujc2/y/2026';

function applyDraws(updated, sourceLabel) {
  const previousMax = state.draws.length ? Math.max(...state.draws.map(({ issue }) => issue)) : 0;
  const maxIssue = Math.max(...updated.map(({ issue }) => issue));
  const changed = JSON.stringify(state.draws) !== JSON.stringify(updated);
  const wasAtLatest = !previousMax || Number($('issue-end').value) === previousMax;
  state.draws = updated;
  $('issue-start').max = maxIssue;
  $('issue-end').max = maxIssue;
  if (wasAtLatest) $('issue-end').value = maxIssue;
  $('source-status').textContent = `${state.draws.length} 期 · 最新 2026${String(maxIssue).padStart(3, '0')} · ${sourceLabel}`;
  if (changed) {
    renderRecommendation();
    renderCurrentHeat();
    renderOverlap();
    renderColdNumbers();
    render();
  }
}

async function fetchRemoteDraws() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(API_URL, { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`接口 HTTP ${response.status}`);
    const payload = await response.json();
    const rows = Array.isArray(payload) ? payload : payload && payload.data;
    if (!Array.isArray(rows)) throw new Error('接口响应缺少 data 数组');
    const thisYear = rows.filter(({ expect }) => /^2026\d{3}$/.test(expect));
    return parseDraws(thisYear.map(({ expect, openCode }) => ({ expect, openCode })));
  } finally {
    clearTimeout(timer);
  }
}

async function updatePage() {
  const source = document.querySelector('.source');
  try {
    applyDraws(await fetchRemoteDraws(), '接口实时数据');
    source.classList.remove('failed');
  } catch (error) {
    try {
      applyDraws(parseDraws(DRAW_ROWS), '接口失败，已降级本地数据');
      source.classList.add('failed');
      console.warn('接口请求失败，已降级到本地数据：', error);
    } catch (fallbackError) {
      $('source-status').textContent = '数据读取失败';
      source.classList.add('failed');
      showError(`无法读取数据：${fallbackError.message}`);
    }
  }
}

updatePage();

})();

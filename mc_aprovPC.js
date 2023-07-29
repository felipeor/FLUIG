function resolve(process, colleague) {
	var userList = new java.util.ArrayList();

	var tblAprovadores = hAPI.getChildrenFromTable("tbAprovadores");
	var tblAprovadoresSize = hAPI.getChildrenIndexes("tbAprovadores").length;
	var matAprovador = ''

	var nivel = Number(hAPI.getCardValue("nivelAtual"));
	nivel = nivel ? "0" + nivel : '01';

	log.info('@@@@mecanismo alcada compras nivel: ' + nivel)

	for (var i = 0; i < tblAprovadoresSize; i++) {
		var nivelAprov = tblAprovadores.get("nContNivel___" + (i + 1))
		log.info('@@@@mecanismo alcada compras nivel: ' + nivel)

		if (nivelAprov == nivel) {
			matAprovador = tblAprovadores.get("ra_cic___" + (i + 1))
			hAPI.setCardValue("nivelAtual", nivelAprov);
			userList.add(matAprovador)
		}
	}

	log.info('mc alcadas compras - userlist')
	log.dir(userList)
	return userList;






}
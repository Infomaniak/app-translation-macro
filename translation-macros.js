(function () {
	var translationSheet = Api.GetSheet("Translations");
	var ouptutFrIos = "";
	var ouptutFrAndroid = "";

	var ouptutEnIos = "";
	var ouptutEnAndroid = "";

	var ouptutDeIos = "";
	var ouptutDeAndroid = "";

	var ouptutItIos = "";
	var ouptutItAndroid = "";

	var ouptutEsIos = "";
	var ouptutEsAndroid = "";

	for (var i = 2; i < 1000; i += 1) {
		var key = translationSheet.GetRange("A" + i).GetValue();
		if (key.localeCompare("")) {
			var rowValue = translationSheet.GetRange("B" + i).GetValue().replace(/'/g, "’");
			if (rowValue.includes("</b>")) {
				ouptutFrIos += '"' + key + '"' + " = " + '"<html><head><meta charset=\'utf-8\'></head>' + rowValue + '</html>";\n';
				ouptutFrAndroid += '\t<string name="' + key + '"><![CDATA[' + rowValue + ']]></string>\n';
			} else {
				ouptutFrIos += '"' + key + '"' + " = " + '"' + rowValue + '";\n';
				ouptutFrAndroid += '\t<string name="' + key + '">' + rowValue + '</string>\n';
			}

			rowValue = translationSheet.GetRange("C" + i).GetValue().replace(/'/g, "’");
			if (rowValue.includes("</b>")) {
				ouptutDeIos += '"' + key + '"' + " = " + '"<html><head><meta charset=\'utf-8\'></head>' + rowValue + '</html>";\n';
				ouptutDeAndroid += '\t<string name="' + key + '"><![CDATA[' + rowValue + ']]></string>\n';
			} else {
				ouptutDeIos += '"' + key + '"' + " = " + '"' + rowValue + '";\n';
				ouptutDeAndroid += '\t<string name="' + key + '">' + rowValue + '</string>\n';
			}

			rowValue = translationSheet.GetRange("D" + i).GetValue().replace(/'/g, "’");
			if (rowValue.includes("</b>")) {
				ouptutEnIos += '"' + key + '"' + " = " + '"<html><head><meta charset=\'utf-8\'></head>' + rowValue + '</html>";\n';
				ouptutEnAndroid += '\t<string name="' + key + '"><![CDATA[' + rowValue + ']]></string>\n';
			} else {
				ouptutEnIos += '"' + key + '"' + " = " + '"' + rowValue + '";\n';
				ouptutEnAndroid += '\t<string name="' + key + '">' + rowValue + '</string>\n';
			}

			rowValue = translationSheet.GetRange("E" + i).GetValue().replace(/'/g, "’");
			if (rowValue.includes("</b>")) {
				ouptutItIos += '"' + key + '"' + " = " + '"<html><head><meta charset=\'utf-8\'></head>' + rowValue + '</html>";\n';
				ouptutItAndroid += '\t<string name="' + key + '"><![CDATA[' + rowValue + ']]></string>\n';
			} else {
				ouptutItIos += '"' + key + '"' + " = " + '"' + rowValue + '";\n';
				ouptutItAndroid += '\t<string name="' + key + '">' + rowValue + '</string>\n';
			}

			rowValue = translationSheet.GetRange("F" + i).GetValue().replace(/'/g, "’");
			if (rowValue.includes("</b>")) {
				ouptutEsIos += '"' + key + '"' + " = " + '"<html><head><meta charset=\'utf-8\'></head>' + rowValue + '</html>";\n';
				ouptutEsAndroid += '\t<string name="' + key + '"><![CDATA[' + rowValue + ']]></string>\n';
			} else {
				ouptutEsIos += '"' + key + '"' + " = " + '"' + rowValue + '";\n';
				ouptutEsAndroid += '\t<string name="' + key + '">' + rowValue + '</string>\n';
			}

			ouptutFrIos = ouptutFrIos.replace(/%s/g, "%@");
			ouptutDeIos = ouptutDeIos.replace(/%s/g, "%@");
			ouptutEnIos = ouptutEnIos.replace(/%s/g, "%@");
			ouptutItIos = ouptutItIos.replace(/%s/g, "%@");
			ouptutEsIos = ouptutEsIos.replace(/%s/g, "%@");
		}
	}

	var resultSheetIos = Api.GetSheet("iOS");
	resultSheetIos.GetRange("A2").SetValue(ouptutFrIos);
	resultSheetIos.GetRange("B2").SetValue(ouptutDeIos);
	resultSheetIos.GetRange("C2").SetValue(ouptutEnIos);
	resultSheetIos.GetRange("D2").SetValue(ouptutItIos);
	resultSheetIos.GetRange("E2").SetValue(ouptutEsIos);

	var resultSheetAndroid = Api.GetSheet("Android");
	resultSheetAndroid.GetRange("A2").SetValue(ouptutFrAndroid);
	resultSheetAndroid.GetRange("B2").SetValue(ouptutDeAndroid);
	resultSheetAndroid.GetRange("C2").SetValue(ouptutEnAndroid);
	resultSheetAndroid.GetRange("D2").SetValue(ouptutItAndroid);
	resultSheetAndroid.GetRange("E2").SetValue(ouptutEsAndroid);

})();
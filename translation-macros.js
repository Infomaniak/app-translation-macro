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
            var result = generateKey(rowValue, key);
            ouptutFrIos += result[0];
            ouptutFrAndroid += result[1];


            rowValue = translationSheet.GetRange("C" + i).GetValue().replace(/'/g, "’");
            result = generateKey(rowValue, key);
            ouptutDeIos += result[0];
            ouptutDeAndroid += result[1];

            rowValue = translationSheet.GetRange("D" + i).GetValue().replace(/'/g, "’");
            result = generateKey(rowValue, key);
            ouptutEnIos += result[0];
            ouptutEnAndroid += result[1];

            rowValue = translationSheet.GetRange("E" + i).GetValue().replace(/'/g, "’");
            result = generateKey(rowValue, key);
            ouptutItIos += result[0];
            ouptutItAndroid += result[1];

            rowValue = translationSheet.GetRange("F" + i).GetValue().replace(/'/g, "’");
            result = generateKey(rowValue, key);
            ouptutEsIos += result[0];
            ouptutEsAndroid += result[1];

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

    function generateKey(rowValue, key) {
        var resultIos = "";
        var resultAndroid = "";
        if (rowValue.includes("</b>")) {
            resultIos = '"' + key + '"' + " = " + '"<html><head><meta charset=\'utf-8\'></head>' + rowValue + '</html>";\n';
            resultAndroid = '\t<string name="' + key + '"><![CDATA[' + rowValue + ']]></string>\n';
        } else {
            resultIos = '"' + key + '"' + " = " + '"' + rowValue + '";\n';
            resultAndroid = '\t<string name="' + key + '">' + rowValue + '</string>\n';
        }
        return [resultIos, resultAndroid];
    }
})();

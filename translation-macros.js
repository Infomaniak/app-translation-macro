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
        var availability = translationSheet.GetRange("B" + i).GetValue();

        if (key.localeCompare("")) {
            var result = generateKey(translationSheet, "C", i, key, availability);
            ouptutFrIos += result[0];
            ouptutFrAndroid += result[1];

            result = generateKey(translationSheet, "D", i, key, availability);
            ouptutDeIos += result[0];
            ouptutDeAndroid += result[1];

            result = generateKey(translationSheet, "E", i, key, availability);
            ouptutEnIos += result[0];
            ouptutEnAndroid += result[1];

            result = generateKey(translationSheet, "F", i, key, availability);
            ouptutItIos += result[0];
            ouptutItAndroid += result[1];

            result = generateKey(translationSheet, "G", i, key, availability);
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

    function generateKey(sheet, column, row, key, availability) {
        var rowValue = sheet.GetRange(column + row).GetValue().replace(/'/g, "’");
        var resultIos = "";
        var resultAndroid = "";
        if (rowValue.includes("</b>")) {
            if (availability.includes("i")) {
                resultIos = '"' + key + '"' + " = " + '"<html><head><meta charset=\'utf-8\'></head>' + rowValue + '</html>";\n';
            }
            if (availability.includes("a")) {
                if (key.includes("##{")) {
                    if (key.includes("##{one}")) {
                        resultAndroid = '<plurals name="' + key.replace("##{one}", "") + '">\n';
                        resultAndroid += '<item quantity="one">![CDATA[' + rowValue + ']]></item>\n';
                        var nextKey = sheet.GetRange("A" + (i + 1)).GetValue();

                        if (nextKey.includes("##{other}")) {
                            var nextRowValue = sheet.GetRange(column + (row + 1)).GetValue().replace(/'/g, "’");
                            resultAndroid += '<item quantity="other">![CDATA[' + nextRowValue + ']]></item>\n';
                        }
                        resultAndroid += '</plurals>\n';
                    }
                } else {
                    resultAndroid = '\t<string name="' + key + '"><![CDATA[' + rowValue + ']]></string>\n';
                }
            }
        } else {
            if (availability.includes("i")) {
                resultIos = '"' + key + '"' + " = " + '"' + rowValue + '";\n';
            }
            if (availability.includes("a")) {
                if (key.includes("##{")) {
                    if (key.includes("##{one}")) {
                        resultAndroid = '<plurals name="' + key.replace("##{one}", "") + '">\n';
                        resultAndroid += '<item quantity="one">' + rowValue + '</item>\n';
                        var nextKey = sheet.GetRange("A" + (i + 1)).GetValue();

                        if (nextKey.includes("##{other}")) {
                            var nextRowValue = sheet.GetRange(column + (row + 1)).GetValue().replace(/'/g, "’");
                            resultAndroid += '<item quantity="other">' + nextRowValue + '</item>\n';
                        }
                        resultAndroid += '</plurals>\n';
                    }
                } else {
                    resultAndroid = '\t<string name="' + key + '">' + rowValue + '</string>\n';
                }
            }
        }
        return [resultIos, resultAndroid];
    }
})();

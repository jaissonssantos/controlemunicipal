/*
 * jQuery Excel Export Plugin Library
 * http://tarunbatta.blogspot.com/
 *
 * Copyright (c) 2013 Tarun Batta
 * Licensed under BTechCo licenses.
 * https://github.com/btechco/btechco_excelexport/wiki
 *
 */

(function ($) {

    $datatype = {
        Table: 1
        , Json: 2
        , Xml: 3
        , JqGrid: 4
    }

    var $defaults = {
        containerid: null
        , datatype: $datatype.Table
        , dataset: null
        , columns: null
        , filename: null
    };

    var $settings = $defaults;

    $.fn.btechco_excelexport = function (options) {
        $settings = $.extend({}, $defaults, options);

        switch ($settings.datatype) {
            case 1:
                Export($("#" + $settings.containerid).parent().html());
                break;
            case 2:
                Export(ConvertJsonToTable());
                break;
            case 3:
                Export(ConvertXmlToTable());
                break;
            case 4:
                Export(ConvertJqGridDataToTable());
                break;
        }

        function ConvertJsonToTable() {
            var result = "<table>";

            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $($settings.dataset).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";
            return result;
        }

        function ConvertXmlToTable() {
            var result = "<table>";

            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $($settings.dataset).find("row").each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if ($(value).attr(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'";
                            }
                            result += ">";
                            result += $(value).attr(this.datafield);
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";
            return result;
        }

        function ConvertJqGridDataToTable() {
            var result = "<table>";

            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";
            result += "<tbody>";

            $($settings.dataset).find("rows > row").each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if ($(value).find(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'";
                            }
                            result += ">";
                            result += $(value).find(this.datafield).text();
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";
            return result;
        }

        function Export(htmltable) {
            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
            excelFile += "<head>";
            excelFile += "<!--[if gte mso 9]>";
            excelFile += "<xml>";
            excelFile += "<x:ExcelWorkbook>";
            excelFile += "<x:ExcelWorksheets>";
            excelFile += "<x:ExcelWorksheet>";
            excelFile += "<x:Name>";
            excelFile += "{worksheet}";
            excelFile += "</x:Name>";
            excelFile += "<x:WorksheetOptions>";
            excelFile += "<x:DisplayGridlines/>";
            excelFile += "</x:WorksheetOptions>";
            excelFile += "</x:ExcelWorksheet>";
            excelFile += "</x:ExcelWorksheets>";
            excelFile += "</x:ExcelWorkbook>";
            excelFile += "</xml>";
            excelFile += "<![endif]-->";
            excelFile += "</head>";
            excelFile += "<body>";
            while (htmltable.indexOf('á') != -1) htmltable = htmltable.replace('á', '&aacute;');
            while (htmltable.indexOf('ã') != -1) htmltable = htmltable.replace('ã', '&atilde;');
            while (htmltable.indexOf('â') != -1) htmltable = htmltable.replace('â', '&acirc;');
            while (htmltable.indexOf('Á') != -1) htmltable = htmltable.replace('Á', '&Aacute;');
            while (htmltable.indexOf('é') != -1) htmltable = htmltable.replace('é', '&eacute;');
            while (htmltable.indexOf('ê') != -1) htmltable = htmltable.replace('ê', '&ecirc;');
            while (htmltable.indexOf('É') != -1) htmltable = htmltable.replace('É', '&Eacute;');
            while (htmltable.indexOf('í') != -1) htmltable = htmltable.replace('í', '&iacute;');
            while (htmltable.indexOf('Í') != -1) htmltable = htmltable.replace('Í', '&Iacute;');
            while (htmltable.indexOf('ó') != -1) htmltable = htmltable.replace('ó', '&oacute;');
            while (htmltable.indexOf('ô') != -1) htmltable = htmltable.replace('ô', '&ocirc;');
            while (htmltable.indexOf('õ') != -1) htmltable = htmltable.replace('õ', '&otilde;');
            while (htmltable.indexOf('Ó') != -1) htmltable = htmltable.replace('Ó', '&Oacute;');
            while (htmltable.indexOf('Õ') != -1) htmltable = htmltable.replace('Õ', '&Otilde;');
            while (htmltable.indexOf('ú') != -1) htmltable = htmltable.replace('ú', '&uacute;');
            while (htmltable.indexOf('Ú') != -1) htmltable = htmltable.replace('Ú', '&Uacute;');
            while (htmltable.indexOf('º') != -1) htmltable = htmltable.replace('º', '&ordm;');
            while (htmltable.indexOf('ñ') != -1) htmltable = htmltable.replace('ñ', '&ntilde;'); 
            while (htmltable.indexOf('Ñ') != -1) htmltable = htmltable.replace('Ñ', '&Ntilde;'); 
            while (htmltable.indexOf('ç') != -1) htmltable = htmltable.replace('ç', '&ccedil;'); 
            while (htmltable.indexOf('Ç') != -1) htmltable = htmltable.replace('Ç', '&Ccedil;'); 
            excelFile += htmltable;
            // excelFile += htmltable.replace(/"/g, '\'');
            excelFile += "</body>";
            excelFile += "</html>";
            var base64data = "base64," + $.base64.encode(excelFile);

            var filename = ($settings.filename == null) ? 'test' :  $settings.filename;
            var uri = 'data:application/vnd.ms-excel;' + base64data;
            var downloadLink = document.createElement("a");
            downloadLink.href = uri;
            downloadLink.download = filename+".xls";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            //window.open('data:application/vnd.ms-excel;charset=utf-8;filename='+filename+';' + base64data);
        }
    };
})(jQuery);
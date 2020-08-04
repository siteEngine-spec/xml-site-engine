function toggle(e)
{
	if (e.parentElement.className == "expand")
	{
		e.parentElement.className = "collapse";
		e.parentElement.getElementsByTagName("ul")[0].style.display = "none";
	}
	else
	{
		e.parentElement.className = "expand";
		e.parentElement.getElementsByTagName("ul")[0].style.display = "";
	}
}

function menuActive(number)
{
	ul = document.getElementsByClassName("menu_main")[0];
	list = ul.getElementsByTagName("li");
	list[number-1].className = "active";
}

function getParameters()
{
	result = new Array();
	count = 0;

	srtParameters = window.location.search.substring(1);

	if (srtParameters.length > 0)
	{
		if (srtParameters.indexOf("&") > -1)
		{
			parameters = srtParameters.split("&");
			for(index=0; index<parameters.length; index++)
			{
				item = parameters[index];

				if (item.indexOf("=") > -1)
				{
					parameter = item.split("=");

					result[count] = new Array(2);
					result[count][0] = parameter[0];
					result[count][1] = parameter[1];

					count++;
				}
			}
		}
		else if (srtParameters.indexOf("=") > -1)
		{
			parameter = srtParameters.split("=");

			result[count] = new Array(2);
			result[count][0] = parameter[0];
			result[count][1] = parameter[1];
		}
	}

	return result;
}

function clearTags(textHTML)
{
	findTextBegin = "<body>";
	findTextEnd = "</body>";

	result = "";

	pos = textHTML.indexOf(findTextBegin);

	if (pos > -1)
	{
		old_pos = pos + findTextBegin.length;

		pos = textHTML.indexOf(findTextEnd, old_pos)
		if (pos > -1)
		{
			result = textHTML.substr(old_pos, pos - old_pos);
		}
		else
		{
			result = textHTML.substr(old_pos, textHTML.length - old_pos);
		}
	}
	else
	{
		result = textHTML;
	}

	return result;
}

function renderXSLT(xml_file, xsl_file, parameters)
{
	text_HTML = "";

	try
	{
		xslt = new ActiveXObject("Msxml2.XSLTemplate.3.0");
		xmlDoc = new ActiveXObject("Msxml2.DOMDocument.3.0");
		xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.3.0");

		xmlDoc.async = false;
		xmlDoc.load(xml_file);

		xslDoc.async = false;
		xslDoc.load(xsl_file);

		xslt.stylesheet = xslDoc;

		xslProc = xslt.createProcessor();
		xslProc.input = xmlDoc;

		for(index=0; index<parameters.length; index++)
		{
			xslProc.addParameter(parameters[index][0], parameters[index][1]);
		}

		xslProc.transform();

		text_HTML = xslProc.output;
	}
	catch (e)
	{
		try
		{
			var xsltProcessor = new XSLTProcessor();

			var xml_client = new XMLHttpRequest();

			xml_client.open("GET", xml_file, false);
			xml_client.send();

			var xmlRef = xml_client.responseXML;

			var xsl_client = new XMLHttpRequest();

			xsl_client.open("GET", xsl_file, false);
			xsl_client.send();

			var xslRef = xsl_client.responseXML;

			xsltProcessor.importStylesheet(xslRef);

			for(index=0; index<parameters.length; index++)
			{
				xsltProcessor.setParameter(null, parameters[index][0], parameters[index][1]);
			}

			result = xsltProcessor.transformToDocument(xmlRef);

			elements = result.getElementsByTagName("*");

			text_HTML = clearTags(elements[0].innerHTML);
		}
		catch (e)
		{
			alert(e.message);
		}
	}

	return text_HTML;
}

function mainDone()
{
	nav_menu = document.getElementsByTagName("nav")[0];
	nav_menu.innerHTML = renderXSLT("xml/menu.xml", "xsl/menu.xsl", new Array());

	menuActive(1);

	article = document.getElementsByTagName("article")[0];
	article.innerHTML = renderXSLT("xml/main.xml", "xsl/main.xsl", new Array());

	aside = document.getElementsByTagName("aside")[0];
	aside.innerHTML = renderXSLT("xml/links.xml", "xsl/links.xsl", new Array());

	footer = document.getElementsByTagName("footer")[0];
	footer.innerHTML = renderXSLT("xml/footer.xml", "xsl/footer.xsl", new Array());
}

function articlesDone()
{
	nav_menu = document.getElementsByTagName("nav")[0];
	nav_menu.innerHTML = renderXSLT("xml/menu.xml", "xsl/menu.xsl", new Array());

	menuActive(2);

	article = document.getElementsByTagName("article")[0];
	article.innerHTML = renderXSLT("xml/articles.xml", "xsl/articles.xsl", getParameters());

	aside = document.getElementsByTagName("aside")[0];
	aside.innerHTML = renderXSLT("xml/treeview.xml", "xsl/treeview.xsl", new Array());

	footer = document.getElementsByTagName("footer")[0];
	footer.innerHTML = renderXSLT("xml/footer.xml", "xsl/footer.xsl", new Array());
}

function helpDone()
{
	nav_menu = document.getElementsByTagName("nav")[0];
	nav_menu.innerHTML = renderXSLT("xml/menu.xml", "xsl/menu.xsl", new Array());

	menuActive(3);

	article = document.getElementsByTagName("article")[0];
	article.innerHTML = renderXSLT("xml/help.xml", "xsl/articles.xsl", getParameters());

	aside = document.getElementsByTagName("aside")[0];
	aside.innerHTML = renderXSLT("xml/questions.xml", "xsl/treeview.xsl", new Array());

	footer = document.getElementsByTagName("footer")[0];
	footer.innerHTML = renderXSLT("xml/footer.xml", "xsl/footer.xsl", new Array());
}

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" />

	<xsl:template match="introduction/text">
		<xsl:apply-templates select = "title" />
		<xsl:apply-templates select = "content" />
	</xsl:template>
	<xsl:template match="title">
		<xsl:copy-of select="node()"/>
	</xsl:template>
	<xsl:template match="content">
		<xsl:copy-of select="node()"/>
	</xsl:template>
</xsl:stylesheet>

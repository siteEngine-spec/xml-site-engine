<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" />

	<xsl:param name="label" select="'introduction'" />

	<xsl:template match="/">
		<xsl:for-each select="texts/text[@label=$label]">
			<xsl:apply-templates select = "title" />
			<xsl:apply-templates select = "content" />
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="title">
		<xsl:copy-of select="node()"/>
	</xsl:template>
	<xsl:template match="content">
		<xsl:copy-of select="node()"/>
	</xsl:template>
</xsl:stylesheet>
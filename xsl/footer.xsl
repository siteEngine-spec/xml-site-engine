<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" />

	<xsl:template match="contact">
		<hr />
		<p>
			<xsl:value-of select="email" />
		</p>
	</xsl:template>
</xsl:stylesheet>

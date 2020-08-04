<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" />

	<xsl:template match="/">
		<h3>
			Сайты
		</h3>
		<ul class="tree">
			<xsl:for-each select="links/page[@category='sites']">
				<li>
					<a href="{@link}">
						<xsl:value-of select="@text" />
					</a>
				</li>
			</xsl:for-each>
		</ul>

		<h3>
			Новинки
		</h3>
		<ul class="tree">
			<xsl:for-each select="links/page[@category='news']">
				<li>
					<a href="{@link}">
						<xsl:value-of select="@text" />
					</a>
				</li>
			</xsl:for-each>
		</ul>
	</xsl:template>
</xsl:stylesheet>

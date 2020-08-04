<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" />

	<xsl:template match="/">
		<xsl:choose>
			<xsl:when test="system-property('xsl:vendor')='Transformiix'">
				<html>
					<head>
					</head>
					<body>
						<ul>
							<xsl:attribute name="class">
								<xsl:value-of select="'menu_main'" />
							</xsl:attribute>

							<xsl:for-each select="items/item">
								<li>
									<a href="{@link}">
										<xsl:value-of select="@text" />
									</a>
								</li>
							</xsl:for-each>
						</ul>
					</body>
				</html>
			</xsl:when>
			<xsl:otherwise>
				<ul>
					<xsl:attribute name="class">
						<xsl:value-of select="'menu_main'" />
					</xsl:attribute>

					<xsl:for-each select="items/item">
						<li>
							<a href="{@link}">
								<xsl:value-of select="@text" />
							</a>
						</li>
					</xsl:for-each>
				</ul>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>

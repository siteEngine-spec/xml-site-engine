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
								<xsl:value-of select="'tree'" />
							</xsl:attribute>

							<xsl:apply-templates />
						</ul>
					</body>
				</html>
			</xsl:when>
			<xsl:otherwise>
				<ul>
					<xsl:attribute name="class">
						<xsl:value-of select="'tree'" />
					</xsl:attribute>

					<xsl:apply-templates />
				</ul>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="*">
		<xsl:choose>
			<xsl:when test="node()">
				<li class="expand">
					<xsl:attribute name="class">
						<xsl:value-of select="'expand'" />
					</xsl:attribute>

					<a href="{@link}" onClick="toggle(this)">
						<xsl:value-of select="@text" />
					</a>

					<ul>
						<xsl:attribute name="class">
							<xsl:value-of select="'tree'" />
						</xsl:attribute>

						<xsl:apply-templates />
					</ul>
				</li>
			</xsl:when>
			<xsl:otherwise>
				<li>
					<a href="{@link}">
						<xsl:value-of select="@text" />
					</a>
				</li>
			</xsl:otherwise>
		</xsl:choose>	
	</xsl:template>
</xsl:stylesheet>

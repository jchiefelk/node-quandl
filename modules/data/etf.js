

var ETF = {

	/**
	* Commodity ETFs
	**/


	// Oil ETFS
	commodity_uso: {
			code: 'USO',
			market: 'NYSE',
			db: 'GOOG'
		
	},

	// Natural Gas
	commodity_ung: {
			code: 'USG',
			market: 'NYSE',
			db: 'GOOG'
	},

	// Gold ETFS
	commodity_spdr_gld: {
			code: 'GLD',
			market: 'AMEX',
			db: 'GOOG'
	},

	commodity_ishares_iau: {
			code: 'IAU',
			market: 'AMEX',
			db: 'GOOG'
	},

	// Silver ETFs
	commodity_ishares_slv: {
			code: 'SLV',
			market: 'NYSEARCA',
			db: 'GOOG'
	},

	// Commodities ETF
	commodity_powershares_dbc: {
			code: 'DBC',
			market: 'NYSEARCA',
			db: 'GOOG'
		
	},

	/**
	* Sector ETF
	**/
	sector_energy_xle: {
			code: 'XLE',
			market: 'AMEX',
			db: 'GOOG'

	},

	sector_industrials_xli: {
			code: 'XLI',
			market: 'AMEX',
			db: 'GOOG'

	},

	sector_utilities_xlu: {
			code: 'XLU',
			market: 'AMEX',
			db: 'GOOG'
	},

	sector_financials_xlf: {
			code: 'XLF',
			market: 'NYSE',
			db: 'GOOG'
	},

	sector_goldminers_gdx: {
			code: 'GDX',
			market: 'NYSEARCA',
			db: 'GOOG'
	}
};

module.exports = ETF;
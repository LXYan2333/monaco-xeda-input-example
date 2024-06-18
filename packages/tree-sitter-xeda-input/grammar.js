module.exports = grammar({
    name: 'XEDA',

    extras: $ => [$._line_ending, $._space],

    rules: {

        source_file: $ => seq(
            optional($.ctr_section),
            optional($.geo_section),
            optional($.eda_section)
        ),

        _line_ending: $ => /[ ]*\r?\n/,
        _space: $ => ' ',

        // $CTR
        ctr_section: $ => seq(
            $.ctr_start_token,
            $.ctr_item_list,
            $.end_token
        ),

        ctr_start_token: $ => /\$[cC][tT][rR][lL]?/,

        ctr_item_list: $ => repeat1($.ctr_item),

        ctr_item: $ => seq(
            $.ctr_keyword,
            optional(seq(
                '=',
                optional($.ctr_value)
            ))),

        ctr_value: $ => /[^ $\r\n]+/,

        ctr_keyword: $ => /[^ =$\r\n]+/,

        end_token: $ => /\$[eE][nN][dD]/,

        // $GEO
        geo_section: $ => seq(
            $.geo_start_token,
            $.geo_item_list,
            $.end_token
        ),

        geo_start_token: $ => /\$[gG][eE][oO][mM]?/,

        geo_item_list: $ => repeat1($.geo_item),

        geo_item: $ => seq(
            optional($.atom_name),
            $.coordinates,
            $._line_ending),

        atom_name: $ => /[^ $\r\n0-9\-\.]+/,

        // x、y、z 合并在一起匹配，避免跨行匹配
        // https://github.com/tree-sitter/tree-sitter/issues/931
        coordinates: $ => repeat1($.coordinate),

        coordinate: $ => /[^$\r\n ]+/,

        // $EDA
        eda_section: $ => seq(
            $.eda_start_token,
            $.eda_item_list,
            $.end_token),

        eda_start_token: $ => /\$[eE][dD][aA]/,

        eda_item_list: $ => repeat1($.eda_item),

        eda_item: $ => seq(
            $.eda_keyword,
            optional(seq(
                '=',
                optional(repeat1($.eda_value))
            )),
            $._line_ending
        ),

        eda_keyword: $ => /[^ =$\r\n]+/,

        eda_value: $ => /[^$\r\n ]+/
    }
});

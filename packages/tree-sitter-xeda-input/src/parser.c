#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 45
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 32
#define ALIAS_COUNT 0
#define TOKEN_COUNT 12
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 4
#define PRODUCTION_ID_COUNT 1

enum {
  sym__line_ending = 1,
  sym__space = 2,
  sym_ctr_start_token = 3,
  anon_sym_EQ = 4,
  aux_sym_ctr_keyword_token1 = 5,
  sym_ctr_value = 6,
  sym_end_token = 7,
  sym_geo_start_token = 8,
  sym_atom_name = 9,
  aux_sym_coordinate_token1 = 10,
  sym_eda_start_token = 11,
  sym_source_file = 12,
  sym_ctr_section = 13,
  sym_ctr_item_list = 14,
  sym_ctr_item = 15,
  sym_ctr_keyword = 16,
  sym_geo_section = 17,
  sym_geo_item_list = 18,
  sym_geo_item = 19,
  sym_coordinates = 20,
  sym_coordinate = 21,
  sym_eda_section = 22,
  sym_eda_item_list = 23,
  sym_eda_item = 24,
  sym_eda_keyword = 25,
  sym_eda_value = 26,
  aux_sym_ctr_item_list_repeat1 = 27,
  aux_sym_geo_item_list_repeat1 = 28,
  aux_sym_coordinates_repeat1 = 29,
  aux_sym_eda_item_list_repeat1 = 30,
  aux_sym_eda_item_repeat1 = 31,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [sym__line_ending] = "_line_ending",
  [sym__space] = "_space",
  [sym_ctr_start_token] = "ctr_start_token",
  [anon_sym_EQ] = "=",
  [aux_sym_ctr_keyword_token1] = "ctr_keyword_token1",
  [sym_ctr_value] = "ctr_value",
  [sym_end_token] = "end_token",
  [sym_geo_start_token] = "geo_start_token",
  [sym_atom_name] = "atom_name",
  [aux_sym_coordinate_token1] = "coordinate_token1",
  [sym_eda_start_token] = "eda_start_token",
  [sym_source_file] = "source_file",
  [sym_ctr_section] = "ctr_section",
  [sym_ctr_item_list] = "ctr_item_list",
  [sym_ctr_item] = "ctr_item",
  [sym_ctr_keyword] = "ctr_keyword",
  [sym_geo_section] = "geo_section",
  [sym_geo_item_list] = "geo_item_list",
  [sym_geo_item] = "geo_item",
  [sym_coordinates] = "coordinates",
  [sym_coordinate] = "coordinate",
  [sym_eda_section] = "eda_section",
  [sym_eda_item_list] = "eda_item_list",
  [sym_eda_item] = "eda_item",
  [sym_eda_keyword] = "eda_keyword",
  [sym_eda_value] = "eda_value",
  [aux_sym_ctr_item_list_repeat1] = "ctr_item_list_repeat1",
  [aux_sym_geo_item_list_repeat1] = "geo_item_list_repeat1",
  [aux_sym_coordinates_repeat1] = "coordinates_repeat1",
  [aux_sym_eda_item_list_repeat1] = "eda_item_list_repeat1",
  [aux_sym_eda_item_repeat1] = "eda_item_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [sym__line_ending] = sym__line_ending,
  [sym__space] = sym__space,
  [sym_ctr_start_token] = sym_ctr_start_token,
  [anon_sym_EQ] = anon_sym_EQ,
  [aux_sym_ctr_keyword_token1] = aux_sym_ctr_keyword_token1,
  [sym_ctr_value] = sym_ctr_value,
  [sym_end_token] = sym_end_token,
  [sym_geo_start_token] = sym_geo_start_token,
  [sym_atom_name] = sym_atom_name,
  [aux_sym_coordinate_token1] = aux_sym_coordinate_token1,
  [sym_eda_start_token] = sym_eda_start_token,
  [sym_source_file] = sym_source_file,
  [sym_ctr_section] = sym_ctr_section,
  [sym_ctr_item_list] = sym_ctr_item_list,
  [sym_ctr_item] = sym_ctr_item,
  [sym_ctr_keyword] = sym_ctr_keyword,
  [sym_geo_section] = sym_geo_section,
  [sym_geo_item_list] = sym_geo_item_list,
  [sym_geo_item] = sym_geo_item,
  [sym_coordinates] = sym_coordinates,
  [sym_coordinate] = sym_coordinate,
  [sym_eda_section] = sym_eda_section,
  [sym_eda_item_list] = sym_eda_item_list,
  [sym_eda_item] = sym_eda_item,
  [sym_eda_keyword] = sym_eda_keyword,
  [sym_eda_value] = sym_eda_value,
  [aux_sym_ctr_item_list_repeat1] = aux_sym_ctr_item_list_repeat1,
  [aux_sym_geo_item_list_repeat1] = aux_sym_geo_item_list_repeat1,
  [aux_sym_coordinates_repeat1] = aux_sym_coordinates_repeat1,
  [aux_sym_eda_item_list_repeat1] = aux_sym_eda_item_list_repeat1,
  [aux_sym_eda_item_repeat1] = aux_sym_eda_item_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [sym__line_ending] = {
    .visible = false,
    .named = true,
  },
  [sym__space] = {
    .visible = false,
    .named = true,
  },
  [sym_ctr_start_token] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_EQ] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_ctr_keyword_token1] = {
    .visible = false,
    .named = false,
  },
  [sym_ctr_value] = {
    .visible = true,
    .named = true,
  },
  [sym_end_token] = {
    .visible = true,
    .named = true,
  },
  [sym_geo_start_token] = {
    .visible = true,
    .named = true,
  },
  [sym_atom_name] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_coordinate_token1] = {
    .visible = false,
    .named = false,
  },
  [sym_eda_start_token] = {
    .visible = true,
    .named = true,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [sym_ctr_section] = {
    .visible = true,
    .named = true,
  },
  [sym_ctr_item_list] = {
    .visible = true,
    .named = true,
  },
  [sym_ctr_item] = {
    .visible = true,
    .named = true,
  },
  [sym_ctr_keyword] = {
    .visible = true,
    .named = true,
  },
  [sym_geo_section] = {
    .visible = true,
    .named = true,
  },
  [sym_geo_item_list] = {
    .visible = true,
    .named = true,
  },
  [sym_geo_item] = {
    .visible = true,
    .named = true,
  },
  [sym_coordinates] = {
    .visible = true,
    .named = true,
  },
  [sym_coordinate] = {
    .visible = true,
    .named = true,
  },
  [sym_eda_section] = {
    .visible = true,
    .named = true,
  },
  [sym_eda_item_list] = {
    .visible = true,
    .named = true,
  },
  [sym_eda_item] = {
    .visible = true,
    .named = true,
  },
  [sym_eda_keyword] = {
    .visible = true,
    .named = true,
  },
  [sym_eda_value] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_ctr_item_list_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_geo_item_list_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_coordinates_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_eda_item_list_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_eda_item_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 9,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 13,
  [14] = 14,
  [15] = 15,
  [16] = 16,
  [17] = 17,
  [18] = 18,
  [19] = 19,
  [20] = 20,
  [21] = 21,
  [22] = 22,
  [23] = 23,
  [24] = 24,
  [25] = 25,
  [26] = 26,
  [27] = 27,
  [28] = 28,
  [29] = 29,
  [30] = 30,
  [31] = 31,
  [32] = 32,
  [33] = 33,
  [34] = 34,
  [35] = 35,
  [36] = 36,
  [37] = 37,
  [38] = 38,
  [39] = 39,
  [40] = 40,
  [41] = 41,
  [42] = 42,
  [43] = 43,
  [44] = 44,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(16);
      if (lookahead == '\n') ADVANCE(17);
      if (lookahead == '\r') ADVANCE(1);
      if (lookahead == ' ') ADVANCE(18);
      if (lookahead == '$') ADVANCE(7);
      if (lookahead == '=') ADVANCE(21);
      if (lookahead != 0) ADVANCE(22);
      END_STATE();
    case 1:
      if (lookahead == '\n') ADVANCE(17);
      END_STATE();
    case 2:
      if (lookahead == '\n') ADVANCE(17);
      if (lookahead == '\r') ADVANCE(1);
      if (lookahead == ' ') ADVANCE(18);
      if (lookahead == '$') ADVANCE(11);
      if (lookahead == '-' ||
          lookahead == '.' ||
          ('0' <= lookahead && lookahead <= '9')) ADVANCE(28);
      if (lookahead != 0) ADVANCE(27);
      END_STATE();
    case 3:
      if (lookahead == '\n') ADVANCE(17);
      if (lookahead == '\r') ADVANCE(1);
      if (lookahead == ' ') ADVANCE(18);
      if (lookahead != 0 &&
          lookahead != '$') ADVANCE(28);
      END_STATE();
    case 4:
      if (lookahead == '\n') ADVANCE(17);
      if (lookahead == '\r') ADVANCE(1);
      if (lookahead == ' ') ADVANCE(18);
      if (lookahead != 0 &&
          lookahead != '$') ADVANCE(23);
      END_STATE();
    case 5:
      if (lookahead == '\n') ADVANCE(17);
      if (lookahead == '\r') ADVANCE(1);
      if (lookahead == ' ') ADVANCE(5);
      END_STATE();
    case 6:
      if (lookahead == 'A' ||
          lookahead == 'a') ADVANCE(29);
      END_STATE();
    case 7:
      if (lookahead == 'C' ||
          lookahead == 'c') ADVANCE(15);
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(8);
      if (lookahead == 'G' ||
          lookahead == 'g') ADVANCE(10);
      END_STATE();
    case 8:
      if (lookahead == 'D' ||
          lookahead == 'd') ADVANCE(6);
      if (lookahead == 'N' ||
          lookahead == 'n') ADVANCE(9);
      END_STATE();
    case 9:
      if (lookahead == 'D' ||
          lookahead == 'd') ADVANCE(24);
      END_STATE();
    case 10:
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(13);
      END_STATE();
    case 11:
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(12);
      END_STATE();
    case 12:
      if (lookahead == 'N' ||
          lookahead == 'n') ADVANCE(9);
      END_STATE();
    case 13:
      if (lookahead == 'O' ||
          lookahead == 'o') ADVANCE(26);
      END_STATE();
    case 14:
      if (lookahead == 'R' ||
          lookahead == 'r') ADVANCE(20);
      END_STATE();
    case 15:
      if (lookahead == 'T' ||
          lookahead == 't') ADVANCE(14);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(sym__line_ending);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(sym__space);
      if (lookahead == '\n') ADVANCE(17);
      if (lookahead == '\r') ADVANCE(1);
      if (lookahead == ' ') ADVANCE(5);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(sym_ctr_start_token);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(sym_ctr_start_token);
      if (lookahead == 'L' ||
          lookahead == 'l') ADVANCE(19);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_EQ);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(aux_sym_ctr_keyword_token1);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != ' ' &&
          lookahead != '$' &&
          lookahead != '=') ADVANCE(22);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(sym_ctr_value);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != ' ' &&
          lookahead != '$') ADVANCE(23);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(sym_end_token);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(sym_geo_start_token);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(sym_geo_start_token);
      if (lookahead == 'M' ||
          lookahead == 'm') ADVANCE(25);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(sym_atom_name);
      if (lookahead == '-' ||
          lookahead == '.' ||
          ('0' <= lookahead && lookahead <= '9')) ADVANCE(28);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != ' ' &&
          lookahead != '$') ADVANCE(27);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(aux_sym_coordinate_token1);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != ' ' &&
          lookahead != '$') ADVANCE(28);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(sym_eda_start_token);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 2},
  [3] = {.lex_state = 2},
  [4] = {.lex_state = 2},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 3},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 2},
  [15] = {.lex_state = 3},
  [16] = {.lex_state = 3},
  [17] = {.lex_state = 3},
  [18] = {.lex_state = 2},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
  [21] = {.lex_state = 3},
  [22] = {.lex_state = 0},
  [23] = {.lex_state = 0},
  [24] = {.lex_state = 3},
  [25] = {.lex_state = 0},
  [26] = {.lex_state = 0},
  [27] = {.lex_state = 0},
  [28] = {.lex_state = 0},
  [29] = {.lex_state = 0},
  [30] = {.lex_state = 0},
  [31] = {.lex_state = 0},
  [32] = {.lex_state = 3},
  [33] = {.lex_state = 0},
  [34] = {.lex_state = 4},
  [35] = {.lex_state = 0},
  [36] = {.lex_state = 0},
  [37] = {.lex_state = 0},
  [38] = {.lex_state = 0},
  [39] = {.lex_state = 0},
  [40] = {.lex_state = 3},
  [41] = {.lex_state = 0},
  [42] = {.lex_state = 0},
  [43] = {.lex_state = 0},
  [44] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [sym__line_ending] = ACTIONS(3),
    [sym__space] = ACTIONS(5),
    [sym_ctr_start_token] = ACTIONS(1),
    [anon_sym_EQ] = ACTIONS(1),
    [aux_sym_ctr_keyword_token1] = ACTIONS(1),
    [sym_end_token] = ACTIONS(1),
    [sym_geo_start_token] = ACTIONS(1),
    [sym_eda_start_token] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(37),
    [sym_ctr_section] = STATE(8),
    [sym_geo_section] = STATE(19),
    [sym_eda_section] = STATE(31),
    [ts_builtin_sym_end] = ACTIONS(7),
    [sym__line_ending] = ACTIONS(3),
    [sym__space] = ACTIONS(5),
    [sym_ctr_start_token] = ACTIONS(9),
    [sym_geo_start_token] = ACTIONS(11),
    [sym_eda_start_token] = ACTIONS(13),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 8,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(15), 1,
      sym_atom_name,
    ACTIONS(17), 1,
      aux_sym_coordinate_token1,
    STATE(42), 1,
      sym_geo_item_list,
    STATE(44), 1,
      sym_coordinates,
    STATE(4), 2,
      sym_geo_item,
      aux_sym_geo_item_list_repeat1,
    STATE(17), 2,
      sym_coordinate,
      aux_sym_coordinates_repeat1,
  [27] = 8,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(19), 1,
      sym_end_token,
    ACTIONS(21), 1,
      sym_atom_name,
    ACTIONS(24), 1,
      aux_sym_coordinate_token1,
    STATE(44), 1,
      sym_coordinates,
    STATE(3), 2,
      sym_geo_item,
      aux_sym_geo_item_list_repeat1,
    STATE(17), 2,
      sym_coordinate,
      aux_sym_coordinates_repeat1,
  [54] = 8,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(15), 1,
      sym_atom_name,
    ACTIONS(17), 1,
      aux_sym_coordinate_token1,
    ACTIONS(27), 1,
      sym_end_token,
    STATE(44), 1,
      sym_coordinates,
    STATE(3), 2,
      sym_geo_item,
      aux_sym_geo_item_list_repeat1,
    STATE(17), 2,
      sym_coordinate,
      aux_sym_coordinates_repeat1,
  [81] = 6,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(29), 1,
      aux_sym_ctr_keyword_token1,
    STATE(13), 1,
      sym_ctr_keyword,
    STATE(38), 1,
      sym_ctr_item_list,
    STATE(11), 2,
      sym_ctr_item,
      aux_sym_ctr_item_list_repeat1,
  [101] = 6,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(31), 1,
      aux_sym_ctr_keyword_token1,
    STATE(30), 1,
      sym_eda_keyword,
    STATE(39), 1,
      sym_eda_item_list,
    STATE(10), 2,
      sym_eda_item,
      aux_sym_eda_item_list_repeat1,
  [121] = 6,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(33), 1,
      aux_sym_ctr_keyword_token1,
    ACTIONS(36), 1,
      sym_end_token,
    STATE(30), 1,
      sym_eda_keyword,
    STATE(7), 2,
      sym_eda_item,
      aux_sym_eda_item_list_repeat1,
  [141] = 7,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(11), 1,
      sym_geo_start_token,
    ACTIONS(13), 1,
      sym_eda_start_token,
    ACTIONS(38), 1,
      ts_builtin_sym_end,
    STATE(20), 1,
      sym_geo_section,
    STATE(35), 1,
      sym_eda_section,
  [163] = 6,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(40), 1,
      aux_sym_ctr_keyword_token1,
    ACTIONS(43), 1,
      sym_end_token,
    STATE(13), 1,
      sym_ctr_keyword,
    STATE(9), 2,
      sym_ctr_item,
      aux_sym_ctr_item_list_repeat1,
  [183] = 6,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(31), 1,
      aux_sym_ctr_keyword_token1,
    ACTIONS(45), 1,
      sym_end_token,
    STATE(30), 1,
      sym_eda_keyword,
    STATE(7), 2,
      sym_eda_item,
      aux_sym_eda_item_list_repeat1,
  [203] = 6,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(29), 1,
      aux_sym_ctr_keyword_token1,
    ACTIONS(47), 1,
      sym_end_token,
    STATE(13), 1,
      sym_ctr_keyword,
    STATE(9), 2,
      sym_ctr_item,
      aux_sym_ctr_item_list_repeat1,
  [223] = 5,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(49), 1,
      aux_sym_coordinate_token1,
    STATE(43), 1,
      sym_coordinates,
    STATE(17), 2,
      sym_coordinate,
      aux_sym_coordinates_repeat1,
  [240] = 4,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(51), 1,
      anon_sym_EQ,
    ACTIONS(53), 2,
      aux_sym_ctr_keyword_token1,
      sym_end_token,
  [254] = 4,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(55), 1,
      sym_end_token,
    ACTIONS(57), 2,
      sym_atom_name,
      aux_sym_coordinate_token1,
  [268] = 4,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(59), 1,
      sym__line_ending,
    ACTIONS(61), 1,
      aux_sym_coordinate_token1,
    STATE(15), 2,
      sym_eda_value,
      aux_sym_eda_item_repeat1,
  [282] = 4,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(64), 1,
      sym__line_ending,
    ACTIONS(66), 1,
      aux_sym_coordinate_token1,
    STATE(15), 2,
      sym_eda_value,
      aux_sym_eda_item_repeat1,
  [296] = 4,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(49), 1,
      aux_sym_coordinate_token1,
    ACTIONS(68), 1,
      sym__line_ending,
    STATE(24), 2,
      sym_coordinate,
      aux_sym_coordinates_repeat1,
  [310] = 4,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(70), 1,
      sym_end_token,
    ACTIONS(72), 2,
      sym_atom_name,
      aux_sym_coordinate_token1,
  [324] = 5,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(13), 1,
      sym_eda_start_token,
    ACTIONS(38), 1,
      ts_builtin_sym_end,
    STATE(35), 1,
      sym_eda_section,
  [340] = 5,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(13), 1,
      sym_eda_start_token,
    ACTIONS(74), 1,
      ts_builtin_sym_end,
    STATE(36), 1,
      sym_eda_section,
  [356] = 4,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(66), 1,
      aux_sym_coordinate_token1,
    ACTIONS(76), 1,
      sym__line_ending,
    STATE(16), 2,
      sym_eda_value,
      aux_sym_eda_item_repeat1,
  [370] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(78), 3,
      ts_builtin_sym_end,
      sym_geo_start_token,
      sym_eda_start_token,
  [382] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(80), 3,
      anon_sym_EQ,
      aux_sym_ctr_keyword_token1,
      sym_end_token,
  [394] = 4,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(82), 1,
      sym__line_ending,
    ACTIONS(84), 1,
      aux_sym_coordinate_token1,
    STATE(24), 2,
      sym_coordinate,
      aux_sym_coordinates_repeat1,
  [408] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(87), 2,
      aux_sym_ctr_keyword_token1,
      sym_end_token,
  [419] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(89), 2,
      aux_sym_ctr_keyword_token1,
      sym_end_token,
  [430] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(91), 2,
      aux_sym_ctr_keyword_token1,
      sym_end_token,
  [441] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(93), 2,
      aux_sym_ctr_keyword_token1,
      sym_end_token,
  [452] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(95), 2,
      ts_builtin_sym_end,
      sym_eda_start_token,
  [463] = 3,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(97), 1,
      sym__line_ending,
    ACTIONS(99), 1,
      anon_sym_EQ,
  [473] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(38), 1,
      ts_builtin_sym_end,
  [483] = 2,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(101), 2,
      sym__line_ending,
      aux_sym_coordinate_token1,
  [491] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(103), 1,
      ts_builtin_sym_end,
  [501] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(105), 1,
      sym_ctr_value,
  [511] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(74), 1,
      ts_builtin_sym_end,
  [521] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(107), 1,
      ts_builtin_sym_end,
  [531] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(109), 1,
      ts_builtin_sym_end,
  [541] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(111), 1,
      sym_end_token,
  [551] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(113), 1,
      sym_end_token,
  [561] = 2,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(115), 2,
      sym__line_ending,
      aux_sym_coordinate_token1,
  [569] = 2,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(117), 2,
      sym__line_ending,
      anon_sym_EQ,
  [577] = 3,
    ACTIONS(3), 1,
      sym__line_ending,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(119), 1,
      sym_end_token,
  [587] = 2,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(121), 1,
      sym__line_ending,
  [594] = 2,
    ACTIONS(5), 1,
      sym__space,
    ACTIONS(123), 1,
      sym__line_ending,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 27,
  [SMALL_STATE(4)] = 54,
  [SMALL_STATE(5)] = 81,
  [SMALL_STATE(6)] = 101,
  [SMALL_STATE(7)] = 121,
  [SMALL_STATE(8)] = 141,
  [SMALL_STATE(9)] = 163,
  [SMALL_STATE(10)] = 183,
  [SMALL_STATE(11)] = 203,
  [SMALL_STATE(12)] = 223,
  [SMALL_STATE(13)] = 240,
  [SMALL_STATE(14)] = 254,
  [SMALL_STATE(15)] = 268,
  [SMALL_STATE(16)] = 282,
  [SMALL_STATE(17)] = 296,
  [SMALL_STATE(18)] = 310,
  [SMALL_STATE(19)] = 324,
  [SMALL_STATE(20)] = 340,
  [SMALL_STATE(21)] = 356,
  [SMALL_STATE(22)] = 370,
  [SMALL_STATE(23)] = 382,
  [SMALL_STATE(24)] = 394,
  [SMALL_STATE(25)] = 408,
  [SMALL_STATE(26)] = 419,
  [SMALL_STATE(27)] = 430,
  [SMALL_STATE(28)] = 441,
  [SMALL_STATE(29)] = 452,
  [SMALL_STATE(30)] = 463,
  [SMALL_STATE(31)] = 473,
  [SMALL_STATE(32)] = 483,
  [SMALL_STATE(33)] = 491,
  [SMALL_STATE(34)] = 501,
  [SMALL_STATE(35)] = 511,
  [SMALL_STATE(36)] = 521,
  [SMALL_STATE(37)] = 531,
  [SMALL_STATE(38)] = 541,
  [SMALL_STATE(39)] = 551,
  [SMALL_STATE(40)] = 561,
  [SMALL_STATE(41)] = 569,
  [SMALL_STATE(42)] = 577,
  [SMALL_STATE(43)] = 587,
  [SMALL_STATE(44)] = 594,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, SHIFT_EXTRA(),
  [5] = {.entry = {.count = 1, .reusable = false}}, SHIFT_EXTRA(),
  [7] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [15] = {.entry = {.count = 1, .reusable = false}}, SHIFT(12),
  [17] = {.entry = {.count = 1, .reusable = false}}, SHIFT(32),
  [19] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_geo_item_list_repeat1, 2),
  [21] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_geo_item_list_repeat1, 2), SHIFT_REPEAT(12),
  [24] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_geo_item_list_repeat1, 2), SHIFT_REPEAT(32),
  [27] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_geo_item_list, 1),
  [29] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [31] = {.entry = {.count = 1, .reusable = true}}, SHIFT(41),
  [33] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_eda_item_list_repeat1, 2), SHIFT_REPEAT(41),
  [36] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_eda_item_list_repeat1, 2),
  [38] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [40] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_ctr_item_list_repeat1, 2), SHIFT_REPEAT(23),
  [43] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_ctr_item_list_repeat1, 2),
  [45] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_eda_item_list, 1),
  [47] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_ctr_item_list, 1),
  [49] = {.entry = {.count = 1, .reusable = true}}, SHIFT(32),
  [51] = {.entry = {.count = 1, .reusable = true}}, SHIFT(34),
  [53] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_ctr_item, 1),
  [55] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_geo_item, 2),
  [57] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_geo_item, 2),
  [59] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_eda_item_repeat1, 2),
  [61] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_eda_item_repeat1, 2), SHIFT_REPEAT(40),
  [64] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [66] = {.entry = {.count = 1, .reusable = true}}, SHIFT(40),
  [68] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_coordinates, 1),
  [70] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_geo_item, 3),
  [72] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_geo_item, 3),
  [74] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 2),
  [76] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [78] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_ctr_section, 3),
  [80] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_ctr_keyword, 1),
  [82] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_coordinates_repeat1, 2),
  [84] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_coordinates_repeat1, 2), SHIFT_REPEAT(32),
  [87] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_eda_item, 4),
  [89] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_eda_item, 3),
  [91] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_ctr_item, 3),
  [93] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_eda_item, 2),
  [95] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_geo_section, 3),
  [97] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [99] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [101] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_coordinate, 1),
  [103] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_eda_section, 3),
  [105] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [107] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 3),
  [109] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [111] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [113] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [115] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_eda_value, 1),
  [117] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_eda_keyword, 1),
  [119] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [121] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [123] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_XEDA(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif

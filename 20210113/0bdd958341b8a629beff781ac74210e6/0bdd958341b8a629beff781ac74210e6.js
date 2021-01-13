var weapon = 0
var screen_size = Render.GetScreenSize();
var x = screen_size[0] / 2;
var y = screen_size[1] / 2;
var select = 1;
var select2 = 1;
var SLIDER_WIDTH = 180;
var TEXT_SIZE = 9;
var MARGIN_SIDE_SIZE = 5;
var MARGIN_TOP_SIZE = 15;
var KEY_CODES = ['-', 'm1', 'm2', , 'm3', 'm4', 'm5', , 'back', 'tab', , , , 'enter', , , 'shift', 'ctrl', 'alt', 'brk', 'caps', , , , , , , 'esc', , , , , , 'prior', 'next', 'end', 'home', 'left', 'up', 'right', 'down', , , , , 'ins', 'del', , '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', , , , , , , , 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'lwin', 'rwin', 'sel', , , 'num0', 'num1', 'num2', 'num3', 'num4', 'num5', 'num6', 'num7', 'num8', 'num9', 'mul', 'add', , 'sub', 'dec', 'div', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', , , , , , , , , , , , , , , , , , , , , 'num', 'scrl'];
var NUM_KEYS = KEY_CODES['length'];
var selected = '';
var offset_selected = {
    x: 0,
    y: 0
};
var windows = [];
var ui_elements = [];
var keys = [];

function UI_GETVAL(_0x70a4x12) {
    if (_0x70a4x12['split']) {
        return UI['GetValue']['apply'](null, _0x70a4x12['split'](/, ?/g))
    } else {
        return UI['GetValue']['apply'](null, _0x70a4x12)
    }
}

function UI_SETVAL(_0x70a4x12, _0x70a4x14) {
    _0x70a4x12['push'](_0x70a4x14);
    if (_0x70a4x12['split']) {
        return UI['SetValue']['apply'](null, _0x70a4x12['split'](/, ?/g))
    } else {
        return UI['SetValue']['apply'](null, _0x70a4x12)
    }
}

function set_val(_0x70a4x16, _0x70a4x14) {
    UI_SETVAL(['Misc', 'JAVASCRIPT', 'Script items', _0x70a4x16], _0x70a4x14)
}

function get_val(_0x70a4x16) {
    return UI_GETVAL(['Misc', 'JAVASCRIPT', 'Script items', _0x70a4x16])
}

function hide(_0x70a4x16) {
    UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', _0x70a4x16, false)
}

function register_checkbox(_0x70a4x1a) {
    if (ui_elements['indexOf'](_0x70a4x1a) + 1) {
        return
    };
    ui_elements['push'](_0x70a4x1a);
    UI.AddCheckbox(_0x70a4x1a);
    hide(_0x70a4x1a)
}

function register_int_slider(_0x70a4x1a, min, max) {
    if (ui_elements['indexOf'](_0x70a4x1a) + 1) {
        return
    };
    ui_elements['push'](_0x70a4x1a);
    UI.AddSliderInt(_0x70a4x1a, min, max);
    hide(_0x70a4x1a)
}

function register_float_slider(_0x70a4x1a, min, max) {
    if (ui_elements['indexOf'](_0x70a4x1a) + 1) {
        return
    };
    ui_elements['push'](_0x70a4x1a);
    UI.AddSliderFloat(_0x70a4x1a, min, max);
    hide(_0x70a4x1a)
}

function register_dropdown(_0x70a4x1a, _0x70a4x20) {
    if (ui_elements['indexOf'](_0x70a4x1a) + 1) {
        return
    };
    ui_elements['push'](_0x70a4x1a);
    UI.AddDropdown(_0x70a4x1a, _0x70a4x20);
    hide(_0x70a4x1a)
}

function register_multidropdown(_0x70a4x1a, _0x70a4x20) {
    if (ui_elements['indexOf'](_0x70a4x1a) + 1) {
        return
    };
    ui_elements['push'](_0x70a4x1a);
    UI.AddMultiDropdown(_0x70a4x1a, _0x70a4x20);
    hide(_0x70a4x1a)
}

function mouse_pos() {
    var _0x70a4x23 = Global.GetCursorPosition();
    return {
        x: _0x70a4x23[0],
        y: _0x70a4x23[1]
    }
}

function key_pressed(key) {
    return keys[key]['pressed']
}

function key_released(key) {
    return keys[key]['released']
}

function key_down(key) {
    return keys[key]['down']
}

function key_press() {
    for (var i = 1; i < NUM_KEYS; i++) {
        if (key_pressed(i)) {
            return i
        }
    };
    return 0
}

function key_off(key) {
    keys[key]['pressed'] = false;
    keys[key]['released'] = false
}

function point_in_rect(_0x70a4x23, min, max) {
    return _0x70a4x23['x'] > min['x'] && _0x70a4x23['y'] > min['y'] && _0x70a4x23['x'] < max['x'] && _0x70a4x23['y'] < max['y']
}

function begin_ui() {
    for (var i = 1; i < NUM_KEYS; i++) {
        keys[i] = {
            pressed: Global.IsKeyPressed(i) && keys[i] && !keys[i]['down'],
            released: !Global.IsKeyPressed(i) && keys[i] && keys[i]['down'],
            down: Global.IsKeyPressed(i)
        }
    }
}

function push_window(_0x70a4x1a, _0x70a4x23, _0x70a4x2e, _0x70a4x2f) {
    windows['push']({
        label: _0x70a4x1a,
        pos: {
            x: _0x70a4x23['x'],
            y: _0x70a4x23['y']
        },
        size: {
            x: _0x70a4x2e,
            y: _0x70a4x2f
        },
        widgets: [],
        cur_column: 0,
        columns: [{
            x: _0x70a4x23['x'] + MARGIN_SIDE_SIZE,
            y: _0x70a4x23['y'] + MARGIN_TOP_SIZE,
            width: _0x70a4x2e - 10
        }],
        measure_widgets: function() {
            var _0x70a4x30 = {
                x: 0,
                y: 0
            };
            for (var i = 0; i < this['widgets']['length']; i++) {
                var _0x70a4x31 = this['widgets'][i]['measure']();
                if (this['widgets'][i]['y'] + _0x70a4x31['y'] > _0x70a4x30['y']) {
                    _0x70a4x30['y'] = this['widgets'][i]['y'] + _0x70a4x31['y'] - this['pos']['y']
                };
                if (this['widgets'][i]['x'] + _0x70a4x31['y'] > _0x70a4x30['x']) {
                    _0x70a4x30['x'] = this['widgets'][i]['x'] + _0x70a4x31['x'] - this['pos']['x']
                }
            };
            return {
                x: _0x70a4x30['x'] - 5,
                y: _0x70a4x30['y']
            }
        }
    });
    if (select == 1) {
        if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
            x: _0x70a4x23['x'] + 150,
            y: _0x70a4x23['y'] + 70
        }, {
            x: _0x70a4x23['x'] + 210,
            y: _0x70a4x23['y'] + 100
        })) {
            weapon = 1
        };
        if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
          x: _0x70a4x23['x'] + 150,
          y: _0x70a4x23['y'] + 110
      }, {
          x: _0x70a4x23['x'] + 210,
          y: _0x70a4x23['y'] + 140
        })) {
            weapon = 2
        };
        if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
          x: _0x70a4x23['x'] + 150,
          y: _0x70a4x23['y'] + 150
      }, {
          x: _0x70a4x23['x'] + 210,
          y: _0x70a4x23['y'] + 180
        })) {
            weapon = 3
        };
        if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
          x: _0x70a4x23['x'] + 150,
          y: _0x70a4x23['y'] + 190
      }, {
          x: _0x70a4x23['x'] + 210,
          y: _0x70a4x23['y'] + 220
        })) {
            weapon = 4
        };
        if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
          x: _0x70a4x23['x'] + 150,
          y: _0x70a4x23['y'] + 230
      }, {
          x: _0x70a4x23['x'] + 210,
          y: _0x70a4x23['y'] + 260
        })) {
            weapon = 0
        }
    };
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
        x: _0x70a4x23['x'] + 0,
        y: _0x70a4x23['y'] + 0
    }, {
        x: _0x70a4x23['x'] + 550,
        y: _0x70a4x23['y'] + 60
    })) {
        selected = _0x70a4x1a;
        offset_selected['x'] = mouse_pos()['x'] - _0x70a4x23['x'];
        offset_selected['y'] = mouse_pos()['y'] - _0x70a4x23['y'];
    };
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
        x: _0x70a4x23['x'] + 0,
        y: _0x70a4x23['y'] + 0
    }, {
        x: _0x70a4x23['x'] + 150,
        y: _0x70a4x23['y'] + 600
    })) {
        selected = _0x70a4x1a;
        offset_selected['x'] = mouse_pos()['x'] - _0x70a4x23['x'];
        offset_selected['y'] = mouse_pos()['y'] - _0x70a4x23['y'];
    };
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
        x: _0x70a4x23['x'] + 150,
        y: _0x70a4x23['y'] + 0
    }, {
        x: _0x70a4x23['x'] + 220,
        y: _0x70a4x23['y'] + 60
    })) {
        select = 1
        select2 = 1
    };
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
      x: _0x70a4x23['x'] + 250,
      y: _0x70a4x23['y'] + 0
  }, {
      x: _0x70a4x23['x'] + 320,
      y: _0x70a4x23['y'] + 60
    })) {
        select = 2
        select2 = 1
    };
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
      x: _0x70a4x23['x'] + 350,
      y: _0x70a4x23['y'] + 0
  }, {
      x: _0x70a4x23['x'] + 420,
      y: _0x70a4x23['y'] + 60
    })) {
        select = 3
        select2 = 1
    };
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
      x: _0x70a4x23['x'] + 450,
      y: _0x70a4x23['y'] + 0
  }, {
      x: _0x70a4x23['x'] + 520,
      y: _0x70a4x23['y'] + 60
    })) {
        select = 4
        select2 = 1
    }
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
        x: _0x70a4x23['x'] + 0,
        y: _0x70a4x23['y'] + 73
    }, {
        x: _0x70a4x23['x'] + 150,
        y: _0x70a4x23['y'] + 103
    })) {
        select2 = 1
    }
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
      x: _0x70a4x23['x'] + 0,
      y: _0x70a4x23['y'] + 108
  }, {
      x: _0x70a4x23['x'] + 150,
      y: _0x70a4x23['y'] + 138
  })) {
        select2 = 2
    }
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
      x: _0x70a4x23['x'] + 0,
      y: _0x70a4x23['y'] + 143
  }, {
      x: _0x70a4x23['x'] + 150,
      y: _0x70a4x23['y'] + 173
  })) {
    if(select == 2 || select == 3)
    {
        select2 = 3
      }
    }
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
      x: _0x70a4x23['x'] + 0,
      y: _0x70a4x23['y'] + 178
  }, {
      x: _0x70a4x23['x'] + 150,
      y: _0x70a4x23['y'] + 208
  })) {
    if(select == 2)
    {
        select2 = 4
      }
    }
     else {
        if (!key_down(0x1) && selected == _0x70a4x1a) {
            selected = ''
        } else {
            if (selected == _0x70a4x1a) {
                _0x70a4x23['x'] = mouse_pos()['x'] - offset_selected['x'];
                _0x70a4x23['y'] = mouse_pos()['y'] - offset_selected['y']
                key_off(0x1)
            }
        }
    };
    return _0x70a4x23
}

function draw_window(_0x70a4x33) {
  Render.FilledRect(_0x70a4x33['pos']['x'] + 2, _0x70a4x33['pos']['y'] + 0, 546, 1, [240, 166, 36, 255]);
  Render.FilledRect(_0x70a4x33['pos']['x'] + 1, _0x70a4x33['pos']['y'] + 1, 548, 1, [240, 166, 36, 255]);
    Render.FilledRect(_0x70a4x33['pos']['x'] + 0, _0x70a4x33['pos']['y'] + 2, 550, 3, [240, 166, 36, 255]);
    Render.FilledRect(_0x70a4x33['pos']['x'] + 0, _0x70a4x33['pos']['y'] + 5, 550, 55, [34, 33, 39, 255]);
    Render.FilledRect(_0x70a4x33['pos']['x'] + 0, _0x70a4x33['pos']['y'] + 60, 150, 465, [27, 26, 31, 255]);
    Render.FilledRect(_0x70a4x33['pos']['x'] + 150, _0x70a4x33['pos']['y'] + 60, 65, 465, [24, 23, 28, 255]);
    Render.FilledRect(_0x70a4x33['pos']['x'] + 210, _0x70a4x33['pos']['y'] + 60, 340, 465, [32, 31, 37, 255]);
    Render.FilledRect(_0x70a4x33['pos']['x'] + 0, _0x70a4x33['pos']['y'] + 60, 515, 1, [45, 45, 50, 255]);
    Render.FilledRect(_0x70a4x33['pos']['x'] + 150, _0x70a4x33['pos']['y'] + 60, 1, 465, [45, 45, 50, 255]);
    Render.FilledRect(_0x70a4x33['pos']['x'] + 210, _0x70a4x33['pos']['y'] + 60, 1, 465, [45, 45, 50, 255]);
    Render.FilledRect(_0x70a4x33['pos']['x'] + 1, _0x70a4x33['pos']['y'] + 525, 548, 1, [27, 26, 31, 255]);
    Render.FilledRect(_0x70a4x33['pos']['x'] + 2, _0x70a4x33['pos']['y'] + 526, 546, 1, [27, 26, 31, 255]);
    font = Render.AddFont('Helvetica', 16, 700);
    Render.StringCustom(_0x70a4x33['pos']['x'] + 75, _0x70a4x33['pos']['y'] + 22, 1, 'VioLet', [255, 255, 255, 255], font)
    font = Render.AddFont('Helvetica', 10, 700);
    Render.StringCustom(_0x70a4x33['pos']['x'] + 185, _0x70a4x33['pos']['y'] + 25, 1, 'Rage', [102, 101, 105, 255], font)
    Render.StringCustom(_0x70a4x33['pos']['x'] + 285, _0x70a4x33['pos']['y'] + 25, 1, 'Anti Aim', [102, 101, 105, 255], font)
    Render.StringCustom(_0x70a4x33['pos']['x'] + 385, _0x70a4x33['pos']['y'] + 25, 1, 'Visuals', [102, 101, 105, 255], font)
    Render.StringCustom(_0x70a4x33['pos']['x'] + 485, _0x70a4x33['pos']['y'] + 25, 1, 'Misc', [102, 101, 105, 255], font)
    if(select == 1)
    {
      if (weapon == 1) {
          font = Render.AddFont('AstriumWep', 11, 700);
          Render.StringCustom(_0x70a4x33['pos']['x'] + 180, _0x70a4x33['pos']['y'] + 85, 1, 'G', [255, 255, 255, 255], font)
      } else {
          font = Render.AddFont('AstriumWep', 11, 700);
          Render.StringCustom(_0x70a4x33['pos']['x'] + 180, _0x70a4x33['pos']['y'] + 85, 1, 'G', [255, 255, 255, 100], font)
      };
      if (weapon == 2) {
          font = Render.AddFont('AstriumWep', 11, 700);
          Render.StringCustom(_0x70a4x33['pos']['x'] + 180, _0x70a4x33['pos']['y'] + 125, 1, 'A', [255, 255, 255, 255], font)
      } else {
          font = Render.AddFont('AstriumWep', 11, 700);
          Render.StringCustom(_0x70a4x33['pos']['x'] + 180, _0x70a4x33['pos']['y'] + 125, 1, 'A', [255, 255, 255, 100], font)
      };
      if (weapon == 3) {
          font = Render.AddFont('AstriumWep', 11, 700);
          Render.StringCustom(_0x70a4x33['pos']['x'] + 180, _0x70a4x33['pos']['y'] + 165, 1, 'a', [255, 255, 255, 255], font)
      } else {
          font = Render.AddFont('AstriumWep', 11, 700);
          Render.StringCustom(_0x70a4x33['pos']['x'] + 180, _0x70a4x33['pos']['y'] + 165, 1, 'a', [255, 255, 255, 100], font)
      };
      if (weapon == 4) {
          font = Render.AddFont('AstriumWep', 11, 700);
          Render.StringCustom(_0x70a4x33['pos']['x'] + 180, _0x70a4x33['pos']['y'] + 205, 1, 'Z', [255, 255, 255, 255], font)
      } else {
          font = Render.AddFont('AstriumWep', 11, 700);
          Render.StringCustom(_0x70a4x33['pos']['x'] + 180, _0x70a4x33['pos']['y'] + 205, 1, 'Z', [255, 255, 255, 100], font)
      };
      if (weapon == 0) {
          font = Render.AddFont('AstriumWep', 11, 700);
          Render.StringCustom(_0x70a4x33['pos']['x'] + 180, _0x70a4x33['pos']['y'] + 245, 1, 'X', [255, 255, 255, 255], font)
      } else {
          font = Render.AddFont('AstriumWep', 11, 700);
          Render.StringCustom(_0x70a4x33['pos']['x'] + 180, _0x70a4x33['pos']['y'] + 245, 1, 'X', [255, 255, 255, 100], font)
      }

      font = Render.AddFont('Helvetica', 10, 700);
      Render.StringCustom(_0x70a4x33['pos']['x'] + 185, _0x70a4x33['pos']['y'] + 25, 1, 'Rage', [202, 202, 205, 255], font)
      font = Render.AddFont('Helvetica', 11, 600);
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 80, 0, 'Aimbot', [102, 101, 107, 255], font)
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 115, 0, 'Other', [102, 101, 107, 255], font)
      if(select2 == 1)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 80, 0, 'Aimbot', [202, 202, 205, 255], font)
      }
      if(select2 == 2)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 115, 0, 'Other', [202, 202, 205, 255], font)
      }
    }
    if(select == 2)
    {
      font = Render.AddFont('Helvetica', 10, 700);
      Render.StringCustom(_0x70a4x33['pos']['x'] + 285, _0x70a4x33['pos']['y'] + 25, 1, 'Anti Aim', [202, 202, 205, 255], font)
      font = Render.AddFont('Helvetica', 11, 600);
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 80, 0, 'Fake Angle', [102, 101, 107, 255], font)
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 115, 0, 'Fake Lag', [102, 101, 107, 255], font)
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 150, 0, 'Other', [102, 101, 107, 255], font)
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 185, 0, 'Detect AA', [102, 101, 107, 255], font)
      if(select2 == 1)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 80, 0, 'Fake Angle', [202, 202, 205, 255], font)
      }
      if(select2 == 2)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 115, 0, 'Fake Lag', [202, 202, 205, 255], font)
      }
      if(select2 == 3)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 150, 0, 'Other', [202, 202, 205, 255], font)
      }
      if(select2 == 4)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 185, 0, 'Detect AA', [202, 202, 205, 255], font)
      }
    }
    if(select == 3)
    {
      font = Render.AddFont('Helvetica', 10, 700);
      Render.StringCustom(_0x70a4x33['pos']['x'] + 385, _0x70a4x33['pos']['y'] + 25, 1, 'Visuals', [202, 202, 205, 255], font)
      font = Render.AddFont('Helvetica', 11, 600);
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 80, 0, 'General', [102, 101, 107, 255], font)
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 115, 0, 'Effects', [102, 101, 107, 255], font)
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 150, 0, 'Color', [102, 101, 107, 255], font)
      if(select2 == 1)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 80, 0, 'General', [202, 202, 205, 255], font)
      }
      if(select2 == 2)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 115, 0, 'Effects', [202, 202, 205, 255], font)
      }
      if(select2 == 3)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 150, 0, 'Color', [202, 202, 205, 255], font)
      }
    }
    if(select == 4)
    {
      font = Render.AddFont('Helvetica', 10, 700);
      Render.StringCustom(_0x70a4x33['pos']['x'] + 485, _0x70a4x33['pos']['y'] + 25, 1, 'Misc', [202, 202, 205, 255], font)
      font = Render.AddFont('Helvetica', 11, 600);
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 80, 0, 'Misc', [102, 101, 107, 255], font)
      Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 115, 0, 'Addon', [102, 101, 107, 255], font)
      if(select2 == 1)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 80, 0, 'Misc', [202, 202, 205, 255], font)
      }
      if(select2 == 2)
      {
        Render.StringCustom(_0x70a4x33['pos']['x'] + 25, _0x70a4x33['pos']['y'] + 115, 0, 'Addon', [202, 202, 205, 255], font)
      }
    }
    for (var i = 0; i < _0x70a4x33['widgets']['length']; i++) {
        _0x70a4x33['widgets'][i]['draw']()
    };
    for (var i = 0; i < _0x70a4x33['widgets']['length']; i++) {
        if (_0x70a4x33['widgets'][i]['draw_overlay']) {
            _0x70a4x33['widgets'][i]['draw_overlay']()
        }
    }
}

function set_columns(_0x70a4x35) {
    var _0x70a4x36 = windows[windows['length'] - 1];
    var _0x70a4x37 = _0x70a4x36['measure_widgets']()['y'];
    _0x70a4x36['columns'] = [];
    MARGIN_TOP_SIZE = 85;
    MARGIN_SIDE_SIZE = 235;
    var _0x70a4x38 = _0x70a4x36['size']['x'] / _0x70a4x35 - MARGIN_SIDE_SIZE;
    var _0x70a4x39 = _0x70a4x36['size']['x'] / _0x70a4x35 + 75;
    for (var i = 0; i < _0x70a4x35; i++) {
        _0x70a4x36['columns']['push']({
            x: _0x70a4x36['pos']['x'] + _0x70a4x39 * i + MARGIN_SIDE_SIZE,
            y: _0x70a4x36['pos']['y'] + _0x70a4x37 + MARGIN_TOP_SIZE,
            width: _0x70a4x38
        })
    };
    _0x70a4x36['cur_column'] = 0
}

function next_column() {
    var _0x70a4x36 = windows[windows['length'] - 1];
    _0x70a4x36['cur_column']++;
    if (_0x70a4x36['cur_column'] == _0x70a4x36['columns']['length']) {
        _0x70a4x36['cur_column'] = 0
    }
}

function prev_column() {
    var _0x70a4x36 = windows[windows['length'] - 1];
    _0x70a4x36['cur_column']--;
    if (_0x70a4x36['cur_column'] == 0) {
        _0x70a4x36['cur_column'] = _0x70a4x36['columns']['length']
    }
}

function pop_window() {
    draw_window(windows[windows['length'] - 1]);
    windows['pop']()
}

function push_checkbox(_0x70a4x1a, _0x70a4x3e) {
    register_checkbox(_0x70a4x1a);
    var _0x70a4x36 = windows[windows['length'] - 1];
    var _0x70a4x3f = _0x70a4x36['columns'][_0x70a4x36['cur_column']];
    _0x70a4x36['widgets']['push']({
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'],
        enabled: _0x70a4x3e,
        draw: function() {
            if (this['enabled']) {
              Render.FilledRect(this['x']+ 0, this['y'] + 0, 20,20, [175, 175, 180, 255]);
              Render.FilledRect(this['x']+ 0, this['y'] + 0, 1,1, [32, 31, 37, 255]);
              Render.FilledRect(this['x']+ 19, this['y'] + 19, 1,1, [32, 31, 37, 255]);
              Render.FilledRect(this['x']+ 0, this['y'] + 19, 1,1, [32, 31, 37, 255]);
              Render.FilledRect(this['x']+ 19, this['y'] + 0, 1,1, [32, 31, 37, 255]);
              Render.Line(this['x']+ 3, this['y'] + 11, this['x']+ 3, this['y'] + 11, [28, 28, 32, 255]);
              Render.Line(this['x']+ 4, this['y'] + 10, this['x']+ 4, this['y'] + 11, [28, 28, 32, 255]);
              Render.Line(this['x']+ 5, this['y'] + 9, this['x']+ 5, this['y'] + 12, [28, 28, 32, 255]);
              Render.Line(this['x']+ 6, this['y'] + 10, this['x']+ 6, this['y'] + 13, [28, 28, 32, 255]);
              Render.Line(this['x']+ 7, this['y'] + 11, this['x']+ 7, this['y'] + 14, [28, 28, 32, 255]);
              Render.Line(this['x']+ 8, this['y'] + 12, this['x']+ 8, this['y'] + 15, [28, 28, 32, 255]);
              Render.Line(this['x']+ 9, this['y'] + 15, this['x']+ 9, this['y'] + 12, [28, 28, 32, 255]);
              Render.Line(this['x']+ 10, this['y'] + 14, this['x']+ 10, this['y'] + 11, [28, 28, 32, 255]);
              Render.Line(this['x']+ 11, this['y'] + 13, this['x']+ 11, this['y'] + 10, [28, 28, 32, 255]);
              Render.Line(this['x']+ 12, this['y'] + 12, this['x']+ 12, this['y'] + 9, [28, 28, 32, 255]);
              Render.Line(this['x']+ 13, this['y'] + 11, this['x']+ 13, this['y'] + 8, [28, 28, 32, 255]);
              Render.Line(this['x']+ 14, this['y'] + 10, this['x']+ 14, this['y'] + 7, [28, 28, 32, 255]);
              Render.Line(this['x']+ 15, this['y'] + 9, this['x']+ 15, this['y'] + 6, [28, 28, 32, 255]);
              Render.Line(this['x']+ 16, this['y'] + 8, this['x']+ 16, this['y'] + 7, [28, 28, 32, 255]);
              Render.Line(this['x']+ 17, this['y'] + 7, this['x']+ 17, this['y'] + 7, [28, 28, 32, 255]);

              Render.String(this['x'] + 25, this['y'] + 2, 0, _0x70a4x1a, [205, 205, 205, 255], 9);
            }
            else {
              Render.FilledRect(this['x']+ 0, this['y'] + 0, 20,20, [175, 175, 180, 255]);
              Render.FilledRect(this['x']+ 0, this['y'] + 0, 1,1, [32, 31, 37, 255]);
              Render.FilledRect(this['x']+ 19, this['y'] + 19, 1,1, [32, 31, 37, 255]);
              Render.FilledRect(this['x']+ 0, this['y'] + 19, 1,1, [32, 31, 37, 255]);
              Render.FilledRect(this['x']+ 19, this['y'] + 0, 1,1, [32, 31, 37, 255]);
              Render.String(this['x'] + 25, this['y'] + 2, 0, _0x70a4x1a, [205, 205, 205, 255], 9);
            }
        },
        measure: function() {
            var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
            return {
                x: 15 + _0x70a4x40[0],
                y: 10
            }
        }
    });
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y']
    }, {
        x: _0x70a4x3f['x'] + 35,
        y: _0x70a4x3f['y'] + 20
    })) {
        set_val(_0x70a4x1a, !_0x70a4x3e);
        key_off(0x1)
    };
    _0x70a4x36['columns'][_0x70a4x36['cur_column']]['y'] += 25;
    return get_val(_0x70a4x1a)
}

function push_colorpicker(_0x70a4x1a, _0x70a4x3e, cl1, cl2, cl3, cl4) {
    register_checkbox(_0x70a4x1a);
    var _0x70a4x36 = windows[windows['length'] - 1];
    var _0x70a4x3f = _0x70a4x36['columns'][_0x70a4x36['cur_column']];
    _0x70a4x36['widgets']['push']({
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'],
        enabled: _0x70a4x3e,
        draw: function() {
          //Render.FilledRect(this['x'],this['y'],100,20,[255,255,255,255])
              Render.FilledRect(this['x'], this['y'] + 5, 20, 20, [ cl1, cl2, cl3, cl4 ] );
              Render.FilledRect(this['x'], this['y'] + 5, 1, 1, [31, 38, 44, 255]);
              Render.FilledRect(this['x']+19, this['y'] + 5, 1, 1, [31, 38, 44, 255]);
              Render.FilledRect(this['x'], this['y'] + 24, 1, 1, [31, 38, 44, 255]);
              Render.FilledRect(this['x']+19, this['y'] + 24, 1, 1, [31, 38, 44, 255]);
              Render.String(this['x'] + 32, this['y'] + 7, 0, _0x70a4x1a, [205, 205, 205, 255], TEXT_SIZE);
        },
        measure: function() {
            var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
            return {
                x: 15 + _0x70a4x40[0],
                y: 10
            }
        }
    });
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'] + 5
    }, {
        x: _0x70a4x3f['x'] + 20,
        y: _0x70a4x3f['y'] + 25
    })) {
        set_val(_0x70a4x1a, !_0x70a4x3e);
        key_off(0x1)
    };
    _0x70a4x36['columns'][_0x70a4x36['cur_column']]['y'] += 30;
    return get_val(_0x70a4x1a)
}

function push_int_slider(_0x70a4x1a, _0x70a4x14, min, max) {
    register_int_slider(_0x70a4x1a, min, max);
    var _0x70a4x36 = windows[windows['length'] - 1];
    var _0x70a4x3f = _0x70a4x36['columns'][_0x70a4x36['cur_column']];
    windows[windows['length'] - 1]['widgets']['push']({
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'],
        val: _0x70a4x14,
        draw: function() {
            var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
            var _0x70a4x42 = Render.TextSize(_0x70a4x14.toString(), TEXT_SIZE);
            var _0x70a4x42 = Render.TextSize(_0x70a4x14.toString(), TEXT_SIZE);
            Render.FilledRect(this['x'], this['y'] + 25, SLIDER_WIDTH, 6, [53, 53, 53, 255]);
            Render.FilledRect(this['x'], this['y'] + 25,this['x'] + (((_0x70a4x14 - min) / (max - min)) * SLIDER_WIDTH) - _0x70a4x3f['x'] + 2 - 4,6, [245,170,35,255]);
            Render.FilledRect(this['x'] + this['x'] + (((_0x70a4x14 - min) / (max - min)) * SLIDER_WIDTH) - _0x70a4x3f['x'] + 2 - 4, this['y'] + 21, 4,1, [255,255,255,255]);
            Render.FilledRect(this['x'] + this['x'] + (((_0x70a4x14 - min) / (max - min)) * SLIDER_WIDTH) - _0x70a4x3f['x'] + 1 - 4, this['y'] + 22, 6,1, [255,255,255,255]);
            Render.FilledRect(this['x'] + this['x'] + (((_0x70a4x14 - min) / (max - min)) * SLIDER_WIDTH) - _0x70a4x3f['x'] + 0 - 4, this['y'] + 23, 8,10, [255,255,255,255]);
            Render.FilledRect(this['x'] + this['x'] + (((_0x70a4x14 - min) / (max - min)) * SLIDER_WIDTH) - _0x70a4x3f['x'] + 1 - 4, this['y'] + 33, 6,1, [255,255,255,255]);
            Render.FilledRect(this['x'] + this['x'] + (((_0x70a4x14 - min) / (max - min)) * SLIDER_WIDTH) - _0x70a4x3f['x'] + 2 - 4, this['y'] + 34, 4,1, [255,255,255,255]);
            Render.String(this['x'], this['y'] + 0, 0, _0x70a4x1a, [205, 205, 205, 255], 9);
            Render.String(this['x'] + SLIDER_WIDTH + 10, this['y'] + 20, 0, _0x70a4x14.toString(), [205, 205, 205, 255], TEXT_SIZE)
        },
        measure: function() {
            var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
            return {
                x: Math['max'](_0x70a4x40[0], SLIDER_WIDTH),
                y: 15
            }
        }
    });
    var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
    var _0x70a4x42 = Render.TextSize(_0x70a4x14.toString(), TEXT_SIZE);
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
        x: _0x70a4x3f['x'] - 5,
        y: _0x70a4x3f['y'] + 21
    }, {
        x: _0x70a4x3f['x'] + SLIDER_WIDTH + 5,
        y: _0x70a4x3f['y'] + 34
    })) {
        selected = _0x70a4x1a;
        key_off(0x1)
    } else {
        if (!key_down(0x1) && selected == _0x70a4x1a) {
            selected = ''
        } else {
            if (selected == _0x70a4x1a) {
                if (mouse_pos()['x'] < _0x70a4x3f['x']) {
                    _0x70a4x14 = min
                } else {
                    if (mouse_pos()['x'] > _0x70a4x3f['x'] + SLIDER_WIDTH) {
                        _0x70a4x14 = max
                    } else {
                        _0x70a4x14 = Math['round'](((mouse_pos()['x'] - _0x70a4x3f['x']) / (SLIDER_WIDTH / (max - min))) + min)
                    }
                };
                set_val(_0x70a4x1a, _0x70a4x14)
            }
        }
    };
    _0x70a4x36['columns'][_0x70a4x36['cur_column']]['y'] += 40;
    return get_val(_0x70a4x1a)
}

function push_float_slider(_0x70a4x1a, _0x70a4x14, min, max, _0x70a4x44) {
    register_float_slider(_0x70a4x1a, min, max);
    var _0x70a4x36 = windows[windows['length'] - 1];
    var _0x70a4x3f = _0x70a4x36['columns'][_0x70a4x36['cur_column']];
    _0x70a4x36['widgets']['push']({
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'],
        val: _0x70a4x14,
        draw: function() {
            var _0x70a4x42 = Render.TextSize(_0x70a4x14['toFixed'](_0x70a4x44).toString(), TEXT_SIZE);
            Render.FilledRect(this['x'], this['y'] + 17, SLIDER_WIDTH, 2, [55, 55, 55, 255]);
            Render.FilledRect(this['x'] + SLIDER_WIDTH / 2 - _0x70a4x42[0] / 2, this['y'] + 17, _0x70a4x42[0], 2, [35, 35, 35, 255]);
            Render.FilledRect(this['x'] + (((_0x70a4x14 - min) / (max - min)) * SLIDER_WIDTH), this['y'] + 14, 2, 9, [125, 125, 125, 255]);
            Render.String(this['x'], this['y'], 0, _0x70a4x1a, [205, 205, 205, 255], 9);
            Render.String(this['x'] + SLIDER_WIDTH / 2 - 1, this['y'] + 13, 1, _0x70a4x14['toFixed'](_0x70a4x44).toString(), [205, 205, 205, 255], TEXT_SIZE)
        },
        measure: function() {
            var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
            return {
                x: Math['max'](_0x70a4x40[0], SLIDER_WIDTH),
                y: 10
            }
        }
    });
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'] + 10
    }, {
        x: _0x70a4x3f['x'] + SLIDER_WIDTH,
        y: _0x70a4x3f['y'] + 25
    })) {
        selected = _0x70a4x1a;
        key_off(0x1)
    } else {
        if (!key_down(0x1) && selected == _0x70a4x1a) {
            selected = ''
        } else {
            if (selected == _0x70a4x1a) {
                if (mouse_pos()['x'] < _0x70a4x3f['x']) {
                    _0x70a4x14 = min
                } else {
                    if (mouse_pos()['x'] > _0x70a4x3f['x'] + SLIDER_WIDTH) {
                        _0x70a4x14 = max
                    } else {
                        _0x70a4x14 = ((mouse_pos()['x'] - _0x70a4x3f['x']) / (SLIDER_WIDTH / (max - min))) + min
                    }
                };
                set_val(_0x70a4x1a, _0x70a4x14)
            }
        }
    };
    _0x70a4x36['columns'][_0x70a4x36['cur_column']]['y'] += 40;
    return get_val(_0x70a4x1a)
}

function push_dropdown(_0x70a4x1a, _0x70a4x46, _0x70a4x20) {
    register_dropdown(_0x70a4x1a, _0x70a4x20);
    var _0x70a4x36 = windows[windows['length'] - 1];
    var _0x70a4x3f = _0x70a4x36['columns'][_0x70a4x36['cur_column']];
    _0x70a4x36['widgets']['push']({
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'],
        items: _0x70a4x20,
        draw: function() {
            var _0x70a4x47 = Render.TextSize(_0x70a4x20[_0x70a4x46], TEXT_SIZE);
            Render.String(this['x'] + 0, this['y'] + 0, 0, _0x70a4x1a, [205, 205, 205, 255], 9);
            Render.Line(this['x'] + 2, this['y'] + 20, this['x'] + 178, this['y'] + 20, [35, 35, 40, 255]);
            Render.Line(this['x'] + 1, this['y'] + 21, this['x'] + 179, this['y'] + 21, [35, 35, 40, 255]);
            Render.FilledRect(this['x'] + 0, this['y'] + 22, 180,16, [35, 35, 40, 255]);
            Render.Line(this['x'] + 1, this['y'] + 38, this['x'] + 179, this['y'] + 38, [35, 35, 40, 255]);
            Render.Line(this['x'] + 2, this['y'] + 39, this['x'] + 178, this['y'] + 39, [35, 35, 40, 255]);

            Render.Line(this['x'] + 3, this['y'] + 19, this['x'] + 178, this['y'] + 19, [45, 45, 50, 255]);//上→
            Render.Line(this['x'] + 3, this['y'] + 41, this['x'] + 178, this['y'] + 41, [45, 45, 50, 255]);//下→
            Render.Line(this['x'] + 0, this['y'] + 21, this['x'] + 0, this['y'] + 38, [45, 45, 50, 255]);//左↓
            Render.Line(this['x'] + 181, this['y'] + 21, this['x'] + 181, this['y'] + 38, [45, 45, 50, 255]);//右↓

            Render.Line(this['x'] + 0, this['y'] + 21, this['x'] + 3, this['y'] + 19, [45, 45, 50, 255]);
            Render.Line(this['x'] + 178, this['y'] + 19, this['x'] + 181, this['y'] + 21, [45, 45, 50, 255]);
            Render.Line(this['x'] + 0, this['y'] + 38, this['x'] + 3, this['y'] + 41, [45, 45, 50, 255]);
            Render.Line(this['x'] + 178, this['y'] + 41, this['x'] + 181, this['y'] + 38, [45, 45, 50, 255]);

            Render.Polygon([
                [this['x'] + 165, this['y'] + 28],
                [this['x'] + 172, this['y'] + 28],
                [this['x'] + 168, this['y'] + 32]
            ], [255, 255, 255, 255]);

            Render.String(this['x'] + 10, this['y'] + 23, 0, _0x70a4x20[_0x70a4x46], [255, 255, 255, 255], TEXT_SIZE);
        },
        draw_overlay: function() {
            if (selected == _0x70a4x1a) {
                var _0x70a4x48 = 0;
                for (var i = 0; i < _0x70a4x20['length']; i++) {
                    var _0x70a4x49 = Render.TextSize(_0x70a4x20[i], TEXT_SIZE);
                    if (_0x70a4x49[0] + 17 > _0x70a4x48) {
                        _0x70a4x48 = _0x70a4x49[0] + 17
                    }
                };
                var _0x70a4x47 = Render.TextSize(_0x70a4x20[_0x70a4x46], 15);
                for (var i = 0; i < _0x70a4x20['length']; i++) {
                    var y = this['y'] + _0x70a4x47[1] + 2 + ((_0x70a4x47[1] + 1) * i);
                    Render.Line(this['x'] + 3, this['y'] + 19, this['x'] + 178, this['y'] + 19, [217, 157, 86, 255]);//上→
                    Render.Line(this['x'] + 3, this['y'] + 41, this['x'] + 178, this['y'] + 41, [217, 157, 86, 255]);//下→
                    Render.Line(this['x'] + 0, this['y'] + 21, this['x'] + 0, this['y'] + 38, [217, 157, 86, 255]);//左↓
                    Render.Line(this['x'] + 181, this['y'] + 21, this['x'] + 181, this['y'] + 38, [217, 157, 86, 255]);//右↓

                    Render.Line(this['x'] + 0, this['y'] + 21, this['x'] + 3, this['y'] + 19, [217, 157, 86, 255]);
                    Render.Line(this['x'] + 178, this['y'] + 19, this['x'] + 181, this['y'] + 21, [217, 157, 86, 255]);
                    Render.Line(this['x'] + 0, this['y'] + 38, this['x'] + 3, this['y'] + 41, [217, 157, 86, 255]);
                    Render.Line(this['x'] + 178, this['y'] + 41, this['x'] + 181, this['y'] + 38, [217, 157, 86, 255]);

                    Render.FilledRect(this['x'] + 1, y + 24, 180, _0x70a4x47[1] + 2, [35, 35, 40, 255]);
                    Render.String(this['x'] + 6, y + 27, 0, _0x70a4x20[i], [205, 205, 205, 255], TEXT_SIZE)
                };
                Render.Rect(this['x'] + 1, this['y'] + _0x70a4x47[1] + 25, 180, (_0x70a4x47[1] + 2) * _0x70a4x20['length'] * 0.95 + 2, [56, 60, 67, 255]);
            }
        },
        measure: function() {
            var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
            var _0x70a4x47 = Render.TextSize(_0x70a4x20[_0x70a4x46], TEXT_SIZE);
            return {
                x: _0x70a4x47 + 25 + _0x70a4x40,
                y: _0x70a4x47[1] + 2
            }
        }
    });
    var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
    var _0x70a4x47 = Render.TextSize(_0x70a4x20[_0x70a4x46], TEXT_SIZE);
    var _0x70a4x48 = 0;
    for (var i = 0; i < _0x70a4x20['length']; i++) {
        var _0x70a4x49 = Render.TextSize(_0x70a4x20[i], TEXT_SIZE);
        if (_0x70a4x49[0] + 17 > _0x70a4x48) {
            _0x70a4x48 = _0x70a4x49[0] + 17
        }
    };
    var _0x70a4x4a = point_in_rect(mouse_pos(), {
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'] + 20
    }, {
        x: _0x70a4x3f['x'] + 180,
        y: _0x70a4x3f['y'] + 40
    });
    var _0x70a4x4b = point_in_rect(mouse_pos(), {
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'] + 32
    }, {
        x: _0x70a4x3f['x'] + 165,
        y: _0x70a4x3f['y'] + _0x70a4x47[1] + 23 + (_0x70a4x47[1] + 2) * _0x70a4x20['length']
    });
    if (key_pressed(0x1) && _0x70a4x4a && selected != _0x70a4x1a) {
        selected = _0x70a4x1a;
        key_off(0x1)
    } else {
        if (key_pressed(0x1) && !_0x70a4x4a && !_0x70a4x4b && selected == _0x70a4x1a) {
            selected = '';
            key_off(0x1)
        } else {
            if (key_pressed(0x1) && selected == _0x70a4x1a) {
                var y = mouse_pos()['y'] - (_0x70a4x3f['y'] + _0x70a4x47[1] + 29);
                if (y > 0) {
                    set_val(_0x70a4x1a, Math['floor'](y / (_0x70a4x47[1] + 1)));
                    selected = '';
                    key_off(0x1)
                }
            }
        }
    };
    _0x70a4x36['columns'][_0x70a4x36['cur_column']]['y'] += 45;
    return get_val(_0x70a4x1a)
}

function push_hotkey(_0x70a4x1a, key) {
    register_int_slider(_0x70a4x1a, 0, NUM_KEYS);
    var _0x70a4x36 = windows[windows['length'] - 1];
    var _0x70a4x3f = _0x70a4x36['columns'][_0x70a4x36['cur_column']];
    _0x70a4x36['widgets']['push']({
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'],
        key: key,
        draw: function() {
            var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
            var _0x70a4x4d = Render.TextSize(KEY_CODES[key] || '[-]', TEXT_SIZE);
            Render.String(this['x'], this['y'], 0, _0x70a4x1a, [205, 205, 205, 255], TEXT_SIZE);
            Render.FilledRect(this['x'] + _0x70a4x40[0] + 45, this['y'] - 1, 25, _0x70a4x4d[1], [31, 38, 44, 255]);
            if (selected == _0x70a4x1a) {
                Render.String(this['x'] + _0x70a4x40[0] + 57, this['y'], 1, '...', [205, 205, 205, 255], TEXT_SIZE)
            } else {
                Render.String(this['x'] + _0x70a4x40[0] + 57, this['y'], 1, '['+KEY_CODES[key]+']' || '[-]', [107, 107, 107, 255], TEXT_SIZE)
            }
        },
        measure: function() {
            var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
            var _0x70a4x4d = Render.TextSize(KEY_CODES[key] || '[-]', TEXT_SIZE);
            return {
                x: _0x70a4x40[0] + 4 + _0x70a4x4d[0] + 27,
                y: _0x70a4x4d[1] + 2
            }
        }
    });
    var _0x70a4x40 = Render.TextSize(_0x70a4x1a, TEXT_SIZE);
    var _0x70a4x4d = Render.TextSize(KEY_CODES[key] || '[-]', TEXT_SIZE);
    if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
        x: _0x70a4x3f['x'] + _0x70a4x40[0] + 35,
        y: _0x70a4x3f['y']
    }, {
        x: _0x70a4x3f['x'] + _0x70a4x40[0] + 5 + 75,
        y: _0x70a4x3f['y'] + _0x70a4x4d[1]
    }) && selected != _0x70a4x1a) {
        selected = _0x70a4x1a;
        key_off(0x1)
    } else {
        if (key_press() && selected == _0x70a4x1a) {
            selected = '';
            if (key_press() == 27) {
                set_val(_0x70a4x1a, 0)
            } else {
                set_val(_0x70a4x1a, key_press())
            }
        }
    };
    _0x70a4x36['columns'][_0x70a4x36['cur_column']]['y'] += 20;
    return get_val(_0x70a4x1a)
}

function push_newline() {
    var _0x70a4x36 = windows[windows['length'] - 1];
    var _0x70a4x3f = _0x70a4x36['columns'][_0x70a4x36['cur_column']];
    _0x70a4x36['widgets']['push']({
        x: _0x70a4x3f['x'],
        y: _0x70a4x3f['y'],
        draw: function() {},
        measure: function() {
            return {
                x: 0,
                y: 5
            }
        }
    });
    _0x70a4x36['columns'][_0x70a4x36['cur_column']]['y'] += 10
}

var pos1 = {
    x: screen_size[0]/2 - 275,
    y: screen_size[1]/2 - 262
};
var pos2 = {
  x: screen_size[0],
  y: screen_size[1]
}
var rage_intslider = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
var aa_intslider = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var visu_intslider = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var misc_intslider = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var rage_dropdown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aa_dropdown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var visu_dropdown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var misc_dropdown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var rage_checkbox = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aa_checkbox = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var visu_checkbox = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var misc_checkbox = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var rage_hotkey = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aa_hotkey = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var visu_hotkey = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var misc_hotkey = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


var select = 1;


//菜单
var just_start = 0
function menu() {
  if(just_start < 3)
  {
    begin_ui();
    push_window('fantasy', pos2, 550, 500);
          rage_checkbox[0] = push_checkbox('Enable Ragebot', rage_checkbox[0])
          rage_intslider[0] = push_int_slider('Minimum Hitchance', rage_intslider[0], 0, 100);
          rage_intslider[1] = push_int_slider('Minimum Damage[Visible]', rage_intslider[1], 0, 130);
          rage_intslider[2] = push_int_slider('Multi-point scale', rage_intslider[2], 0, 100);
          rage_checkbox[1] = push_checkbox('Smart Regulator', rage_checkbox[1])
          rage_checkbox[2] = push_checkbox('Enable Autostop', rage_checkbox[2])
          rage_intslider[3] = push_int_slider('Autostop Speed', rage_intslider[3], 0, 50);
          rage_checkbox[3] = push_checkbox('Enable Doubletap', rage_checkbox[3])
          rage_dropdown[0] = push_dropdown('Doubletap mode', rage_dropdown[0], ['default', 'recharge','smart recharge']);
          rage_intslider[4] = push_int_slider('DT Minimum Hitchance', rage_intslider[4], 0, 100);
          rage_intslider[5] = push_int_slider('DT Minimum Damage[Visible]', rage_intslider[5], 0, 130);
          rage_checkbox[4] = push_checkbox('Only On Shot', rage_checkbox[4])
          rage_checkbox[5] = push_checkbox('Baim Aftershot', rage_checkbox[5])
          rage_checkbox[6] = push_checkbox('Safe Point Aftershot', rage_checkbox[6])
          rage_checkbox[0] = push_checkbox('Enable Ragebot', rage_checkbox[0])
          rage_intslider[6] = push_int_slider('Minimum Hitchance ', rage_intslider[6], 0, 100);
          rage_intslider[7] = push_int_slider('Minimum Damage[Visible] ', rage_intslider[7], 0, 130);
          rage_intslider[8] = push_int_slider('Multi-point scale ', rage_intslider[8], 0, 100);
          rage_checkbox[1] = push_checkbox('Smart Regulator', rage_checkbox[1])
          rage_checkbox[7] = push_checkbox('Enable Autostop ', rage_checkbox[7])
          rage_intslider[9] = push_int_slider('Autostop Speed ', rage_intslider[9], 0, 50);
          rage_checkbox[3] = push_checkbox('Enable Doubletap', rage_checkbox[3])
          rage_dropdown[0] = push_dropdown('Doubletap mode', rage_dropdown[0], ['default', 'recharge','smart recharge']);
          rage_intslider[10] = push_int_slider('DT Minimum Hitchance ', rage_intslider[10], 0, 100);
          rage_intslider[11] = push_int_slider('DT Minimum Damage[Visible] ', rage_intslider[11], 0, 130);
          rage_checkbox[8] = push_checkbox('Only On Shot ', rage_checkbox[8])
          rage_checkbox[9] = push_checkbox('Baim Aftershot ', rage_checkbox[9])
          rage_checkbox[10] = push_checkbox('Safe Point Aftershot ', rage_checkbox[10])
          rage_checkbox[0] = push_checkbox('Enable Ragebot', rage_checkbox[0])
          rage_intslider[12] = push_int_slider('Minimum Hitchance  ', rage_intslider[12], 0, 100);
          rage_intslider[13] = push_int_slider('Minimum Damage[Visible]  ', rage_intslider[13], 0, 130);
          rage_intslider[14] = push_int_slider('Multi-point scale  ', rage_intslider[14], 0, 100);
          rage_checkbox[1] = push_checkbox('Smart Regulator', rage_checkbox[1])
          rage_checkbox[11] = push_checkbox('Enable Autostop  ', rage_checkbox[11])
          rage_intslider[15] = push_int_slider('Autostop Speed  ', rage_intslider[15], 0, 50);
          rage_checkbox[3] = push_checkbox('Enable Doubletap', rage_checkbox[3])
          rage_dropdown[0] = push_dropdown('Doubletap mode', rage_dropdown[0], ['default', 'recharge','smart recharge']);
          rage_intslider[16] = push_int_slider('DT Minimum Hitchance  ', rage_intslider[16], 0, 100);
          rage_intslider[17] = push_int_slider('DT Minimum Damage[Visible]  ', rage_intslider[17], 0, 130);
          rage_checkbox[12] = push_checkbox('Only On Shot  ', rage_checkbox[12])
          rage_checkbox[13] = push_checkbox('Baim Aftershot  ', rage_checkbox[13])
          rage_checkbox[14] = push_checkbox('Safe Point Aftershot  ', rage_checkbox[14])
          rage_checkbox[0] = push_checkbox('Enable Ragebot', rage_checkbox[0])
          rage_intslider[18] = push_int_slider('Minimum Hitchance   ', rage_intslider[18], 0, 100);
          rage_intslider[19] = push_int_slider('Minimum Damage[Visible]   ', rage_intslider[19], 0, 130);
          rage_intslider[20] = push_int_slider('Multi-point scale   ', rage_intslider[20], 0, 100);
          rage_checkbox[1] = push_checkbox('Smart Regulator', rage_checkbox[1])
          rage_checkbox[15] = push_checkbox('Enable Autostop   ', rage_checkbox[15])
          rage_intslider[21] = push_int_slider('Autostop Speed   ', rage_intslider[21], 0, 50);
          rage_checkbox[3] = push_checkbox('Enable Doubletap', rage_checkbox[3])
          rage_dropdown[0] = push_dropdown('Doubletap mode', rage_dropdown[0], ['default', 'recharge','smart recharge']);
          rage_intslider[22] = push_int_slider('DT Minimum Hitchance   ', rage_intslider[22], 0, 100);
          rage_intslider[23] = push_int_slider('DT Minimum Damage[Visible]   ', rage_intslider[23], 0, 130);
          rage_checkbox[16] = push_checkbox('Only On Shot   ', rage_checkbox[16])
          rage_checkbox[17] = push_checkbox('Baim Aftershot   ', rage_checkbox[17])
          rage_checkbox[18] = push_checkbox('Safe Point Aftershot   ', rage_checkbox[18])
          rage_checkbox[0] = push_checkbox('Enable Ragebot', rage_checkbox[0])
          rage_intslider[24] = push_int_slider('Minimum Hitchance    ', rage_intslider[24], 0, 100);
          rage_intslider[25] = push_int_slider('Minimum Damage[Visible]    ', rage_intslider[25], 0, 130);
          rage_intslider[26] = push_int_slider('Multi-point scale    ', rage_intslider[26], 0, 100);
          rage_checkbox[1] = push_checkbox('Smart Regulator', rage_checkbox[1])
          rage_checkbox[19] = push_checkbox('Enable Autostop    ', rage_checkbox[19])
          rage_intslider[27] = push_int_slider('Autostop Speed    ', rage_intslider[27], 0, 50);
          rage_checkbox[3] = push_checkbox('Enable Doubletap', rage_checkbox[3])
          rage_dropdown[0] = push_dropdown('Doubletap mode', rage_dropdown[0], ['default', 'recharge','smart recharge']);
          rage_intslider[28] = push_int_slider('DT Minimum Hitchance    ', rage_intslider[28], 0, 100);
          rage_intslider[29] = push_int_slider('DT Minimum Damage[Visible]    ', rage_intslider[29], 0, 130);
          rage_checkbox[20] = push_checkbox('Only On Shot    ', rage_checkbox[20])
          rage_checkbox[21] = push_checkbox('Baim Aftershot    ', rage_checkbox[21])
          rage_checkbox[22] = push_checkbox('Safe Point Aftershot    ', rage_checkbox[22])
          rage_checkbox[23] = push_checkbox('Smart Regulator ', rage_checkbox[23])
          rage_checkbox[24] = push_checkbox('Smart Regulator  ', rage_checkbox[24])
          rage_checkbox[25] = push_checkbox('Smart Regulator   ', rage_checkbox[25])
          rage_checkbox[26] = push_checkbox('Smart Regulator    ', rage_checkbox[26])
          rage_checkbox[27] = push_checkbox('DT Smart Regulator', rage_checkbox[27])
          rage_checkbox[28] = push_checkbox('DT Smart Regulator ', rage_checkbox[28])
          rage_checkbox[29] = push_checkbox('DT Smart Regulator  ', rage_checkbox[29])
          rage_checkbox[30] = push_checkbox('DT Smart Regulator   ', rage_checkbox[30])
          rage_checkbox[31] = push_checkbox('DT Smart Regulator    ', rage_checkbox[31])
          rage_intslider[30] = push_int_slider('DT Multi-point scale', rage_intslider[30], 0, 100);
          rage_intslider[31] = push_int_slider('DT Multi-point scale ', rage_intslider[31], 0, 100);
          rage_intslider[32] = push_int_slider('DT Multi-point scale  ', rage_intslider[32], 0, 100);
          rage_intslider[33] = push_int_slider('DT Multi-point scale   ', rage_intslider[33], 0, 100);
          rage_intslider[34] = push_int_slider('DT Multi-point scale    ', rage_intslider[34], 0, 100);
          rage_intslider[35] = push_int_slider('Minimum Damage[Unvisible]', rage_intslider[35], 0, 130);
rage_intslider[36] = push_int_slider('Minimum Damage[Unvisible] ', rage_intslider[36], 0, 130);
rage_intslider[37] = push_int_slider('Minimum Damage[Unvisible]  ', rage_intslider[37], 0, 130);
rage_intslider[38] = push_int_slider('Minimum Damage[Unvisible]   ', rage_intslider[38], 0, 130);
rage_intslider[39] = push_int_slider('Minimum Damage[Unvisible]    ', rage_intslider[39], 0, 130);
rage_intslider[40] = push_int_slider('DT Minimum Damage[Unvisible]', rage_intslider[40], 0, 130);
rage_intslider[41] = push_int_slider('DT Minimum Damage[Unvisible] ', rage_intslider[41], 0, 130);
rage_intslider[42] = push_int_slider('DT Minimum Damage[Unvisible]  ', rage_intslider[42], 0, 130);
rage_intslider[43] = push_int_slider('DT Minimum Damage[Unvisible]   ', rage_intslider[43], 0, 130);
rage_intslider[44] = push_int_slider('DT Minimum Damage[Unvisible]    ', rage_intslider[44], 0, 130);
rage_dropdown[5] = push_dropdown('Auto baim mode', rage_dropdown[1], ['None', 'High hp','half hp','Low hp']);
rage_dropdown[5] = push_dropdown('Auto baim mode ', rage_dropdown[2], ['None', 'High hp','half hp','Low hp']);
rage_dropdown[5] = push_dropdown('Auto baim mode  ', rage_dropdown[3], ['None', 'High hp','half hp','Low hp']);
rage_dropdown[5] = push_dropdown('Auto baim mode   ', rage_dropdown[4], ['None', 'High hp','half hp','Low hp']);
rage_dropdown[5] = push_dropdown('Auto baim mode    ', rage_dropdown[5], ['None', 'High hp','half hp','Low hp']);
rage_dropdown[6] = push_dropdown('Lethal mode', rage_dropdown[6], ['None', 'Normal','fast','half lethal']);
rage_dropdown[7] = push_dropdown('Lethal mode ', rage_dropdown[7], ['None', 'Normal','fast','half lethal']);
rage_dropdown[8] = push_dropdown('Lethal mode  ', rage_dropdown[8], ['None', 'Normal','fast','half lethal']);
rage_dropdown[9] = push_dropdown('Lethal mode   ', rage_dropdown[9], ['None', 'Normal','fast','half lethal']);
rage_dropdown[10] = push_dropdown('Lethal mode    ', rage_dropdown[10], ['None', 'Normal','fast','half lethal']);
        aa_checkbox[0] = push_checkbox('Enable Anti-Aim', aa_checkbox[0])
        aa_dropdown[0] = push_dropdown('Movement', aa_dropdown[0], ['static', 'moving', 'slow walk']);
        aa_dropdown[1] = push_dropdown('Pitch', aa_dropdown[1], ['off', 'down', 'emotion', 'zero', 'up', 'fake up', 'fake down']);
        aa_dropdown[2] = push_dropdown('Yaw base', aa_dropdown[2], ['Local view', 'At target']);
        aa_dropdown[3] = push_dropdown('Yaw', aa_dropdown[3], ['off', 'Back yaw']);
        aa_intslider[0] = push_int_slider('Yaw add', aa_intslider[0], -180, 180);
        aa_intslider[32] = push_int_slider('Yaw add inverter', aa_intslider[32], -180, 180);
        aa_dropdown[4] = push_dropdown('Jitter mode', aa_dropdown[4], ['Off', 'Normal', 'Random']);
        aa_intslider[3] = push_int_slider('Yaw jitter', aa_intslider[3], -180, 180)
        aa_dropdown[9] = push_dropdown('Lower body yaw', aa_dropdown[9], ['Normal', 'Opposite', 'Sway' ,'Jitter']);
        aa_intslider[4] = push_int_slider('Yaw add ', aa_intslider[4], -180, 180);
        aa_intslider[33] = push_int_slider('Yaw add inverter ', aa_intslider[33], -180, 180);
        aa_dropdown[4] = push_dropdown('Jitter mode', aa_dropdown[4], ['Off', 'Normal', 'Random']);
        aa_intslider[7] = push_int_slider('Yaw jitter ', aa_intslider[7], -180, 180)
        aa_dropdown[10] = push_dropdown('Lower body yaw ', aa_dropdown[10], ['Normal', 'Opposite', 'Sway' ,'Jitter']);
        aa_intslider[16] = push_int_slider('Yaw add  ', aa_intslider[16], -180, 180);
        aa_intslider[34] = push_int_slider('Yaw add inverter  ', aa_intslider[34], -180, 180);
        aa_dropdown[4] = push_dropdown('Jitter mode', aa_dropdown[4], ['Off', 'Normal', 'Random']);
        aa_intslider[19] = push_int_slider('Yaw jitter  ', aa_intslider[19], -180, 180)
        aa_dropdown[11] = push_dropdown('Lower body yaw  ', aa_dropdown[11], ['Normal', 'Opposite', 'Sway' ,'Jitter']);
        aa_checkbox[2] = push_checkbox('Detect AA', aa_checkbox[2])
        aa_checkbox[5] = push_checkbox('Break Slow Walk', aa_checkbox[5])
        aa_checkbox[3] = push_checkbox('Enable fakelag', aa_checkbox[3])
        aa_dropdown[5] = push_dropdown('Player State', aa_dropdown[5], ['static', 'moving','slow walk','on shot']);
        aa_dropdown[6] = push_dropdown('Fake lag mode', aa_dropdown[6], ['Normal', 'Random', 'Switch']);
        aa_intslider[23] = push_int_slider('Minimum fake lag', aa_intslider[23], 0, 16);
        aa_intslider[24] = push_int_slider('Maximum fake lag', aa_intslider[24], 0, 16);
        aa_intslider[25] = push_int_slider('Minimum fake lag ', aa_intslider[25], 0, 16);
        aa_intslider[26] = push_int_slider('Maximum fake lag ', aa_intslider[26], 0, 16);
        aa_intslider[27] = push_int_slider('Minimum fake lag  ', aa_intslider[27], 0, 16);
        aa_intslider[28] = push_int_slider('Maximum fake lag  ', aa_intslider[28], 0, 16);
        aa_intslider[30] = push_int_slider('Minimum fake lag   ', aa_intslider[30], 0, 16);
        aa_intslider[31] = push_int_slider('Maximum fake lag   ', aa_intslider[31], 0, 16);
        aa_hotkey[0] = push_hotkey('Slow walk key', aa_hotkey[0],0)
        aa_intslider[29] = push_int_slider('Slow walk speed', aa_intslider[29], 0, 70);
        aa_dropdown[7] = push_dropdown('Fake Arrow', aa_dropdown[7], ['none', 'arc','arrow', '<>', '()']);
        aa_dropdown[8] = push_dropdown('Auto Switch', aa_dropdown[8], ['none', 'on hurt', 'on enemy shot']);
        aa_checkbox[6] = push_checkbox('Leg Break', aa_checkbox[6])
        aa_checkbox[7] = push_checkbox('E-peek', aa_checkbox[7])
      visu_checkbox[1] = push_checkbox('Enable watermark', visu_checkbox[1])
      visu_checkbox[2] = push_checkbox('Rainbow watermark', visu_checkbox[2])
      visu_checkbox[21] = push_checkbox('Enable indicator', visu_checkbox[21])
      visu_checkbox[3] = push_checkbox('Enable fake indicator', visu_checkbox[3])
      visu_checkbox[19] = push_checkbox('Enable rage indicator', visu_checkbox[19])
      visu_checkbox[4] = push_checkbox('Enable rainbow bar', visu_checkbox[4])
      visu_checkbox[5] = push_checkbox('Enable scope bar', visu_checkbox[5])
      visu_checkbox[6] = push_checkbox('Enable backround', visu_checkbox[6])
        visu_intslider[0] = push_int_slider('Backround darkmode', visu_intslider[0], 0, 100);
      visu_checkbox[7] = push_checkbox('Fullfilled box', visu_checkbox[7])
      visu_intslider[1] = push_int_slider('Aspect ratio', visu_intslider[1], 0, 100);
      visu_intslider[36] = push_int_slider('World exposure', visu_intslider[36], 0, 100);
      visu_intslider[37] = push_int_slider('Model ambient', visu_intslider[37], 0, 100);
      visu_intslider[38] = push_int_slider('Bloom scale', visu_intslider[38], 0, 100);
      visu_checkbox[8] = push_checkbox('Enable kill draw', visu_checkbox[8])
      visu_checkbox[9] = push_checkbox('Enable kill effect', visu_checkbox[9])
          visu_intslider[2] = push_int_slider('R', visu_intslider[2], 0, 255);
          visu_intslider[3] = push_int_slider('G', visu_intslider[3], 0, 255);
          visu_intslider[4] = push_int_slider('B', visu_intslider[4], 0, 255);
          visu_intslider[5] = push_int_slider('R ', visu_intslider[5], 0, 255);
          visu_intslider[6] = push_int_slider('G ', visu_intslider[6], 0, 255);
          visu_intslider[7] = push_int_slider('B ', visu_intslider[7], 0, 255);
          visu_intslider[8] = push_int_slider('R  ', visu_intslider[8], 0, 255);
          visu_intslider[9] = push_int_slider('G  ', visu_intslider[9], 0, 255);
          visu_intslider[10] = push_int_slider('B  ', visu_intslider[10], 0, 255);
          visu_intslider[11] = push_int_slider('R   ', visu_intslider[11], 0, 255);
          visu_intslider[12] = push_int_slider('G   ', visu_intslider[12], 0, 255);
          visu_intslider[13] = push_int_slider('B   ', visu_intslider[13], 0, 255);
          visu_intslider[14] = push_int_slider('Transparency', visu_intslider[14], 0, 255);
          visu_intslider[15] = push_int_slider('R    ', visu_intslider[15], 0, 255);
          visu_intslider[16] = push_int_slider('G    ', visu_intslider[16], 0, 255);
          visu_intslider[17] = push_int_slider('B    ', visu_intslider[17], 0, 255);
          visu_intslider[18] = push_int_slider('R     ', visu_intslider[18], 0, 255);
          visu_intslider[19] = push_int_slider('G     ', visu_intslider[19], 0, 255);
          visu_intslider[20] = push_int_slider('B     ', visu_intslider[20], 0, 255);
          visu_intslider[21] = push_int_slider('R      ', visu_intslider[21], 0, 255);
          visu_intslider[22] = push_int_slider('G      ', visu_intslider[22], 0, 255);
          visu_intslider[23] = push_int_slider('B      ', visu_intslider[23], 0, 255);
          visu_intslider[24] = push_int_slider('R       ', visu_intslider[24], 0, 255);
          visu_intslider[25] = push_int_slider('G       ', visu_intslider[25], 0, 255);
          visu_intslider[26] = push_int_slider('B       ', visu_intslider[26], 0, 255);
          visu_intslider[27] = push_int_slider('R        ', visu_intslider[27], 0, 255);
          visu_intslider[28] = push_int_slider('G        ', visu_intslider[28], 0, 255);
          visu_intslider[29] = push_int_slider('B        ', visu_intslider[29], 0, 255);
          visu_intslider[30] = push_int_slider('R         ', visu_intslider[30], 0, 255);
          visu_intslider[31] = push_int_slider('G         ', visu_intslider[31], 0, 255);
          visu_intslider[32] = push_int_slider('B         ', visu_intslider[32], 0, 255);
          visu_intslider[33] = push_int_slider('R          ', visu_intslider[33], 0, 255);
          visu_intslider[34] = push_int_slider('G          ', visu_intslider[34], 0, 255);
          visu_intslider[35] = push_int_slider('B          ', visu_intslider[35], 0, 255);
          visu_checkbox[11] = push_colorpicker('Watermark color', visu_checkbox[11],visu_intslider[5],visu_intslider[6],visu_intslider[7],255)
          visu_checkbox[12] = push_colorpicker('Fake color', visu_checkbox[12],visu_intslider[8],visu_intslider[9],visu_intslider[10],255)
          visu_checkbox[13] = push_colorpicker('Box color', visu_checkbox[13],visu_intslider[11],visu_intslider[12],visu_intslider[13],255)
          visu_checkbox[14] = push_colorpicker('Scopebar color', visu_checkbox[14],visu_intslider[15],visu_intslider[16],visu_intslider[17],255)
          visu_checkbox[15] = push_colorpicker('Fake indicator color', visu_checkbox[15],visu_intslider[18],visu_intslider[19],visu_intslider[20],255)
          visu_checkbox[16] = push_colorpicker('Fake indicator font color', visu_checkbox[16],visu_intslider[21],visu_intslider[22],visu_intslider[23],255)
          visu_checkbox[20] = push_colorpicker('Rage indicator color', visu_checkbox[20],visu_intslider[30],visu_intslider[31],visu_intslider[32],255)
          visu_checkbox[17] = push_colorpicker('Kill effect color', visu_checkbox[17],visu_intslider[24],visu_intslider[25],visu_intslider[26],255)
          visu_checkbox[18] = push_colorpicker('Kill draw color', visu_checkbox[18],visu_intslider[27],visu_intslider[28],visu_intslider[29],255)
      misc_checkbox[0] = push_checkbox('Enable spammer', misc_checkbox[0])
      misc_dropdown[3] = push_dropdown('spammer mode', misc_dropdown[3], ['Chinese', 'English', 'Russian', 'Clear'])
      misc_dropdown[2] = push_dropdown('music kits', misc_dropdown[2], ['none', 'Default 1', 'Default 2', 'Crimson Assault', 'Sharpened', 'Insurgency', 'AD8', 'High Noon', 'Death\'s Head Demolition', 'Desert Fire', 'LNOE', 'Skog Metal', 'All I Want For Christmas', 'IsoRhythm', 'For No Mankind', 'Hotline Miami', 'Total Domination', 'The Talos Principle', 'Battlepack', 'MOLOTOV', 'Uber Blasto Phone', 'Hazardous Environments', 'II-Headshot', 'The 8-Bit Kit', 'I Am', 'Diamonds', 'Invasion!', 'Lion\'s Mouth', 'Sponge Fingerz', 'Disgusting', 'Java Havana Funkaloo', 'Moments CSGO', 'Aggressive', 'The Good Youth', 'FREE', 'Life\'s Not Out To Get You', 'Backbone', 'GLA', 'III-Arena', 'EZ4ENCE', 'Master Chief Collection', 'King, Scar', 'Anti-Citizen', 'Bachram', 'Gunman Taco Truck', 'Eye of the Dragon', 'M.U.D.D Force', 'Neo Noir', 'Bodacious', 'Drifter']);
      misc_checkbox[3] = push_checkbox('fake rank', misc_checkbox[3])
      misc_checkbox[4] = push_checkbox('Enable buybot', misc_checkbox[4])
      misc_dropdown[0] = push_dropdown('Primary', misc_dropdown[0], ['autosnipe', 'scout','awp']);
      misc_dropdown[1] = push_dropdown('Secondary', misc_dropdown[1], ['R8/deagle', 'dual elite']);
      misc_checkbox[5] = push_checkbox('Other items', misc_checkbox[5])
      pop_window()
      just_start++
      Cheat.ExecuteCommand("clear")
  }
    if (menu_open != 1) {
        return
    };
    if (visu_checkbox[6] == 1) {
        Render.FilledRect(0, 0, screen_size[0], screen_size[1], [0, 0, 0, 125 + visu_intslider[0]]);
      }
        begin_ui();
        push_window('fantasy', pos1, 550, 500);
    if (select == 1) {
      set_columns(3)
        if (weapon == 0) {
          if(select2 == 1)
          {
          rage_checkbox[0] = push_checkbox('Enable Ragebot', rage_checkbox[0])
          rage_checkbox[1] = push_checkbox('Smart Regulator', rage_checkbox[1])
          push_newline();
          rage_intslider[0] = push_int_slider('Minimum Hitchance', rage_intslider[0], 0, 100);
          rage_intslider[1] = push_int_slider('Minimum Damage[Visible]', rage_intslider[1], 0, 130);
          rage_intslider[35] = push_int_slider('Minimum Damage[Unvisible]', rage_intslider[35], 0, 130);
          rage_intslider[2] = push_int_slider('Multi-point scale', rage_intslider[2], 0, 100);
          push_newline();
          rage_dropdown[1] = push_dropdown('Auto baim mode', rage_dropdown[1], ['None', 'High hp','half hp','Low hp']);
          rage_dropdown[6] = push_dropdown('Lethal mode', rage_dropdown[6], ['None', 'Normal','fast','half lethal']);
          rage_checkbox[4] = push_checkbox('Only On Shot', rage_checkbox[4])
          rage_checkbox[5] = push_checkbox('Baim Aftershot', rage_checkbox[5])
          rage_checkbox[6] = push_checkbox('Safe Point Aftershot', rage_checkbox[6])
        }
        if(select2 == 2)
        {
          rage_checkbox[3] = push_checkbox('Enable Doubletap', rage_checkbox[3])
          rage_dropdown[0] = push_dropdown('Doubletap mode', rage_dropdown[0], ['default', 'recharge','smart recharge']);
          push_newline();
          rage_checkbox[27] = push_checkbox('DT Smart Regulator', rage_checkbox[27])
          rage_intslider[4] = push_int_slider('DT Minimum Hitchance', rage_intslider[4], 0, 100);
          rage_intslider[5] = push_int_slider('DT Minimum Damage[Visible]', rage_intslider[5], 0, 130);
          rage_intslider[40] = push_int_slider('DT Minimum Damage[Unvisible]', rage_intslider[40], 0, 130);
          rage_intslider[30] = push_int_slider('DT Multi-point scale', rage_intslider[30], 0, 100);
          push_newline();
          rage_checkbox[2] = push_checkbox('Enable Autostop', rage_checkbox[2])
          rage_intslider[3] = push_int_slider('Autostop Speed', rage_intslider[3], 0, 50);
        };
      }
        if (weapon == 1) {
          if(select2 == 1)
          {
          rage_checkbox[0] = push_checkbox('Enable Ragebot', rage_checkbox[0])
          rage_checkbox[23] = push_checkbox('Smart Regulator ', rage_checkbox[23])
          push_newline();
          rage_intslider[6] = push_int_slider('Minimum Hitchance ', rage_intslider[6], 0, 100);
          rage_intslider[7] = push_int_slider('Minimum Damage[Visible] ', rage_intslider[7], 0, 130);
          rage_intslider[36] = push_int_slider('Minimum Damage[Unvisible] ', rage_intslider[36], 0, 130);
          rage_intslider[8] = push_int_slider('Multi-point scale ', rage_intslider[8], 0, 100);
          push_newline();
          rage_dropdown[2] = push_dropdown('Auto baim mode ', rage_dropdown[2], ['None', 'High hp','half hp','Low hp']);
          rage_dropdown[7] = push_dropdown('Lethal mode ', rage_dropdown[7], ['None', 'Normal','fast','half lethal']);
          rage_checkbox[8] = push_checkbox('Only On Shot ', rage_checkbox[8])
          rage_checkbox[9] = push_checkbox('Baim Aftershot ', rage_checkbox[9])
          rage_checkbox[10] = push_checkbox('Safe Point Aftershot ', rage_checkbox[10])
        }
        if(select2 == 2)
        {
          rage_checkbox[3] = push_checkbox('Enable Doubletap', rage_checkbox[3])
          rage_dropdown[0] = push_dropdown('Doubletap mode', rage_dropdown[0], ['default', 'recharge','smart recharge']);
          push_newline();
          rage_checkbox[28] = push_checkbox('DT Smart Regulator ', rage_checkbox[28])
          rage_intslider[10] = push_int_slider('DT Minimum Hitchance ', rage_intslider[10], 0, 100);
          rage_intslider[11] = push_int_slider('DT Minimum Damage[Visible] ', rage_intslider[11], 0, 130);
          rage_intslider[41] = push_int_slider('DT Minimum Damage[Unvisible] ', rage_intslider[41], 0, 130);
          rage_intslider[31] = push_int_slider('DT Multi-point scale ', rage_intslider[31], 0, 100);
          push_newline();
          rage_checkbox[7] = push_checkbox('Enable Autostop ', rage_checkbox[7])
          rage_intslider[9] = push_int_slider('Autostop Speed ', rage_intslider[9], 0, 50);
        };
      }
        if (weapon == 2) {
          if(select2 == 1)
          {
          rage_checkbox[0] = push_checkbox('Enable Ragebot', rage_checkbox[0])
          rage_checkbox[24] = push_checkbox('Smart Regulator  ', rage_checkbox[24])
          push_newline();
          rage_intslider[12] = push_int_slider('Minimum Hitchance  ', rage_intslider[12], 0, 100);
          rage_intslider[13] = push_int_slider('Minimum Damage[Visible]  ', rage_intslider[13], 0, 130);
          rage_intslider[37] = push_int_slider('Minimum Damage[Unvisible]  ', rage_intslider[37], 0, 130);
          rage_intslider[14] = push_int_slider('Multi-point scale  ', rage_intslider[14], 0, 100);
          push_newline();
          rage_dropdown[3] = push_dropdown('Auto baim mode  ', rage_dropdown[3], ['None', 'High hp','half hp','Low hp']);
          rage_dropdown[8] = push_dropdown('Lethal mode  ', rage_dropdown[8], ['None', 'Normal','fast','half lethal']);
          rage_checkbox[12] = push_checkbox('Only On Shot  ', rage_checkbox[12])
          rage_checkbox[13] = push_checkbox('Baim Aftershot  ', rage_checkbox[13])
          rage_checkbox[14] = push_checkbox('Safe Point Aftershot  ', rage_checkbox[14])
        }
        if(select2 == 2)
        {
          rage_checkbox[3] = push_checkbox('Enable Doubletap', rage_checkbox[3])
          rage_dropdown[0] = push_dropdown('Doubletap mode', rage_dropdown[0], ['default', 'recharge','smart recharge']);
          push_newline();
          rage_checkbox[29] = push_checkbox('DT Smart Regulator  ', rage_checkbox[29])
          rage_intslider[16] = push_int_slider('DT Minimum Hitchance  ', rage_intslider[16], 0, 100);
          rage_intslider[17] = push_int_slider('DT Minimum Damage[Visible]  ', rage_intslider[17], 0, 130);
          rage_intslider[42] = push_int_slider('DT Minimum Damage[Unvisible]  ', rage_intslider[42], 0, 130);
          rage_intslider[32] = push_int_slider('DT Multi-point scale  ', rage_intslider[32], 0, 100);
          push_newline();
          rage_checkbox[11] = push_checkbox('Enable Autostop  ', rage_checkbox[11])
          rage_intslider[15] = push_int_slider('Autostop Speed  ', rage_intslider[15], 0, 50);
        };
      }
        if (weapon == 3) {
          if(select2 == 1)
          {
          rage_checkbox[0] = push_checkbox('Enable Ragebot', rage_checkbox[0])
          rage_checkbox[25] = push_checkbox('Smart Regulator   ', rage_checkbox[25])
          push_newline();
          rage_intslider[18] = push_int_slider('Minimum Hitchance   ', rage_intslider[18], 0, 100);
          rage_intslider[19] = push_int_slider('Minimum Damage[Visible]   ', rage_intslider[19], 0, 130);
          rage_intslider[38] = push_int_slider('Minimum Damage[Unvisible]   ', rage_intslider[38], 0, 130);
          rage_intslider[20] = push_int_slider('Multi-point scale   ', rage_intslider[20], 0, 100);
          push_newline();
          rage_dropdown[4] = push_dropdown('Auto baim mode   ', rage_dropdown[4], ['None', 'High hp','half hp','Low hp']);
          rage_dropdown[9] = push_dropdown('Lethal mode   ', rage_dropdown[9], ['None', 'Normal','fast','half lethal']);
          rage_checkbox[16] = push_checkbox('Only On Shot   ', rage_checkbox[16])
          rage_checkbox[17] = push_checkbox('Baim Aftershot   ', rage_checkbox[17])
          rage_checkbox[18] = push_checkbox('Safe Point Aftershot   ', rage_checkbox[18])
        }
        if(select2 == 2)
        {
          rage_checkbox[3] = push_checkbox('Enable Doubletap', rage_checkbox[3])
          rage_dropdown[0] = push_dropdown('Doubletap mode', rage_dropdown[0], ['default', 'recharge','smart recharge']);
          push_newline();
          rage_checkbox[30] = push_checkbox('DT Smart Regulator   ', rage_checkbox[30])
          rage_intslider[22] = push_int_slider('DT Minimum Hitchance   ', rage_intslider[22], 0, 100);
          rage_intslider[23] = push_int_slider('DT Minimum Damage[Visible]   ', rage_intslider[23], 0, 130);
          rage_intslider[43] = push_int_slider('DT Minimum Damage[Unvisible]   ', rage_intslider[43], 0, 130);
          rage_intslider[33] = push_int_slider('DT Multi-point scale   ', rage_intslider[33], 0, 100);
          push_newline();
          rage_checkbox[15] = push_checkbox('Enable Autostop   ', rage_checkbox[15])
          rage_intslider[21] = push_int_slider('Autostop Speed   ', rage_intslider[21], 0, 50);
        };
      }
        if (weapon == 4) {
          if(select2 == 1)
          {
          rage_checkbox[0] = push_checkbox('Enable Ragebot', rage_checkbox[0])
          rage_checkbox[26] = push_checkbox('Smart Regulator    ', rage_checkbox[26])
          push_newline();
          rage_intslider[24] = push_int_slider('Minimum Hitchance    ', rage_intslider[24], 0, 100);
          rage_intslider[25] = push_int_slider('Minimum Damage[Visible]    ', rage_intslider[25], 0, 130);
          rage_intslider[39] = push_int_slider('Minimum Damage[Unvisible]    ', rage_intslider[39], 0, 130);
          rage_intslider[26] = push_int_slider('Multi-point scale    ', rage_intslider[26], 0, 100);
          push_newline();
          rage_dropdown[5] = push_dropdown('Auto baim mode    ', rage_dropdown[5], ['None', 'High hp','half hp','Low hp']);
          rage_dropdown[10] = push_dropdown('Lethal mode    ', rage_dropdown[10], ['None', 'Normal','fast','half lethal']);
          rage_checkbox[20] = push_checkbox('Only On Shot    ', rage_checkbox[20])
          rage_checkbox[21] = push_checkbox('Baim Aftershot    ', rage_checkbox[21])
          rage_checkbox[22] = push_checkbox('Safe Point Aftershot    ', rage_checkbox[22])
        }
        if(select2 == 2)
        {
          rage_checkbox[3] = push_checkbox('Enable Doubletap', rage_checkbox[3])
          rage_dropdown[0] = push_dropdown('Doubletap mode', rage_dropdown[0], ['default', 'recharge','smart recharge']);
          push_newline();
          rage_checkbox[31] = push_checkbox('DT Smart Regulator    ', rage_checkbox[31])
          rage_intslider[28] = push_int_slider('DT Minimum Hitchance    ', rage_intslider[28], 0, 100);
          rage_intslider[29] = push_int_slider('DT Minimum Damage[Visible]    ', rage_intslider[29], 0, 130);
          rage_intslider[44] = push_int_slider('DT Minimum Damage[Unvisible]    ', rage_intslider[44], 0, 130);
          rage_intslider[34] = push_int_slider('DT Multi-point scale    ', rage_intslider[34], 0, 100);
          push_newline();
          rage_checkbox[19] = push_checkbox('Enable Autostop    ', rage_checkbox[19])
          rage_intslider[27] = push_int_slider('Autostop Speed    ', rage_intslider[27], 0, 50);
        }
    };
  }
    if (select == 2) {
        set_columns(3);
        if(select2 == 1)
        {
        aa_checkbox[0] = push_checkbox('Enable Anti-Aim', aa_checkbox[0])
        aa_dropdown[0] = push_dropdown('Movement', aa_dropdown[0], ['static', 'moving', 'slow walk']);
        aa_dropdown[1] = push_dropdown('Pitch', aa_dropdown[1], ['off', 'down', 'emotion', 'zero', 'up', 'fake up', 'fake down']);
        aa_dropdown[2] = push_dropdown('Yaw base', aa_dropdown[2], ['Local view', 'At target']);
        aa_dropdown[3] = push_dropdown('Yaw', aa_dropdown[3], ['off', '180']);
        push_newline();
        if(aa_dropdown[3] == 1)
        {
        if (aa_dropdown[0] == 0) {
            aa_intslider[0] = push_int_slider('Yaw add', aa_intslider[0], -180, 180);
            aa_intslider[32] = push_int_slider('Yaw add inverter', aa_intslider[32], -180, 180);
            aa_dropdown[4] = push_dropdown('Jitter mode', aa_dropdown[4], ['Off', 'Normal', 'Random']);
            if(aa_dropdown[4] != 0)
            {
            aa_intslider[3] = push_int_slider('Yaw jitter', aa_intslider[3], -180, 180)
            }
            push_newline()
            aa_dropdown[9] = push_dropdown('Lower body yaw', aa_dropdown[9], ['Normal', 'Opposite', 'Sway' ,'Jitter']);
        };
        if (aa_dropdown[0] == 1) {
            aa_intslider[4] = push_int_slider('Yaw add ', aa_intslider[4], -180, 180);
            aa_intslider[33] = push_int_slider('Yaw add inverter ', aa_intslider[33], -180, 180);
            aa_dropdown[4] = push_dropdown('Jitter mode', aa_dropdown[4], ['Off', 'Normal', 'Random']);
            if(aa_dropdown[4] != 0)
            {
            aa_intslider[7] = push_int_slider('Yaw jitter ', aa_intslider[7], -180, 180)
            }
            push_newline()
            aa_dropdown[10] = push_dropdown('Lower body yaw ', aa_dropdown[10], ['Normal', 'Opposite', 'Sway' ,'Jitter']);
        };
        if (aa_dropdown[0] == 2) {
            aa_intslider[16] = push_int_slider('Yaw add  ', aa_intslider[16], -180, 180);
            aa_intslider[34] = push_int_slider('Yaw add inverter  ', aa_intslider[34], -180, 180);
            aa_dropdown[4] = push_dropdown('Jitter mode', aa_dropdown[4], ['Off', 'Normal', 'Random']);
            if(aa_dropdown[4] != 0)
            {
            aa_intslider[19] = push_int_slider('Yaw jitter  ', aa_intslider[19], -180, 180)
            }
            push_newline()
            aa_dropdown[11] = push_dropdown('Lower body yaw  ', aa_dropdown[11], ['Normal', 'Opposite', 'Sway' ,'Jitter']);
        };
      }
        }
        if(select2 == 4)
        {
        aa_checkbox[2] = push_checkbox('Detect AA', aa_checkbox[2])
        aa_checkbox[5] = push_checkbox('Break Slow Walk', aa_checkbox[5])
        aa_checkbox[7] = push_checkbox('E-peek', aa_checkbox[7])
      }
      if(select2 == 2)
      {
        aa_checkbox[3] = push_checkbox('Enable fakelag', aa_checkbox[3])
        aa_dropdown[5] = push_dropdown('Player State', aa_dropdown[5], ['static', 'moving','slow walk', 'on shot']);
        push_newline()
        aa_dropdown[6] = push_dropdown('Fake lag mode', aa_dropdown[6], ['Normal', 'Random', 'Switch']);
        if(aa_dropdown[5] == 0)
        {
        aa_intslider[23] = push_int_slider('Minimum fake lag', aa_intslider[23], 0, 16);
        aa_intslider[24] = push_int_slider('Maximum fake lag', aa_intslider[24], 0, 16);
        }
        if(aa_dropdown[5] == 1)
        {
        aa_intslider[25] = push_int_slider('Minimum fake lag ', aa_intslider[25], 0, 16);
        aa_intslider[26] = push_int_slider('Maximum fake lag ', aa_intslider[26], 0, 16);
        }
        if(aa_dropdown[5] == 2)
        {
        aa_intslider[27] = push_int_slider('Minimum fake lag  ', aa_intslider[27], 0, 16);
        aa_intslider[28] = push_int_slider('Maximum fake lag  ', aa_intslider[28], 0, 16);
        }
        if(aa_dropdown[5] == 3)
        {
        aa_intslider[30] = push_int_slider('Minimum fake lag   ', aa_intslider[30], 0, 16);
        }
      }
      if(select2 == 3)
      {
        aa_hotkey[0] = push_hotkey('Slow walk key', aa_hotkey[0],0)
        aa_intslider[29] = push_int_slider('Slow walk speed', aa_intslider[29], 0, 70);
        aa_dropdown[7] = push_dropdown('Fake Arrow', aa_dropdown[7], ['none', 'arc','arrow', '<>', '()']);
        aa_dropdown[8] = push_dropdown('Auto Switch', aa_dropdown[8], ['none', 'on hurt', 'on enemy shot']);
        aa_checkbox[6] = push_checkbox('Leg Break', aa_checkbox[6])
    };
  }
    if (select == 3) {
      set_columns(3);
      if(select2 == 1)
      {
      visu_checkbox[1] = push_checkbox('Enable watermark', visu_checkbox[1])
      visu_checkbox[2] = push_checkbox('Rainbow watermark', visu_checkbox[2])
      visu_checkbox[21] = push_checkbox('Enable indicator', visu_checkbox[21])
      visu_checkbox[3] = push_checkbox('Enable fake indicator', visu_checkbox[3])
      visu_checkbox[19] = push_checkbox('Enable rage indicator', visu_checkbox[19])
      visu_checkbox[4] = push_checkbox('Enable rainbow bar', visu_checkbox[4])
      visu_checkbox[5] = push_checkbox('Enable scope bar', visu_checkbox[5])
      visu_checkbox[6] = push_checkbox('Enable backround', visu_checkbox[6])
      if(visu_checkbox[6] == 1)
      {
        visu_intslider[0] = push_int_slider('Backround darkmode', visu_intslider[0], 0, 100);
      }
      visu_checkbox[7] = push_checkbox('Fullfilled box', visu_checkbox[7])
      visu_intslider[1] = push_int_slider('Aspect ratio', visu_intslider[1], 0, 100);
      visu_intslider[36] = push_int_slider('World exposure', visu_intslider[36], 0, 100);
      visu_intslider[37] = push_int_slider('Model ambient', visu_intslider[37], 0, 100);
      visu_intslider[38] = push_int_slider('Bloom scale', visu_intslider[38], 0, 100);
    }
    if(select2 == 2)
    {
      visu_checkbox[8] = push_checkbox('Enable kill draw', visu_checkbox[8])
      visu_checkbox[9] = push_checkbox('Enable kill effect', visu_checkbox[9])
    }
    if(select2 == 3)
    {
    visu_checkbox[11] = push_colorpicker('Watermark color', visu_checkbox[11],visu_intslider[5],visu_intslider[6],visu_intslider[7],255)
    if(visu_checkbox[11] == 1)
    {
    visu_intslider[5] = push_int_slider('R ', visu_intslider[5], 0, 255);
    visu_intslider[6] = push_int_slider('G ', visu_intslider[6], 0, 255);
    visu_intslider[7] = push_int_slider('B ', visu_intslider[7], 0, 255);
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Box color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Scopebar color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator font color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill effect color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill draw color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Rage indicator color',0)
    }
    visu_checkbox[12] = push_colorpicker('Fake color', visu_checkbox[12],visu_intslider[8],visu_intslider[9],visu_intslider[10],255)
    if(visu_checkbox[12] == 1)
    {
    visu_intslider[8] = push_int_slider('R  ', visu_intslider[8], 0, 255);
    visu_intslider[9] = push_int_slider('G  ', visu_intslider[9], 0, 255);
    visu_intslider[10] = push_int_slider('B  ', visu_intslider[10], 0, 255);
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Watermark color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Box color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Scopebar color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator font color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill effect color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill draw color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Rage indicator color',0)
    }
    visu_checkbox[13] = push_colorpicker('Box color', visu_checkbox[13],visu_intslider[11],visu_intslider[12],visu_intslider[13],255)
    if(visu_checkbox[13] == 1)
    {
    visu_intslider[11] = push_int_slider('R   ', visu_intslider[11], 0, 255);
    visu_intslider[12] = push_int_slider('G   ', visu_intslider[12], 0, 255);
    visu_intslider[13] = push_int_slider('B   ', visu_intslider[13], 0, 255);
    visu_intslider[14] = push_int_slider('Transparency', visu_intslider[14], 0, 255);
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Watermark color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Scopebar color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator font color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill effect color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill draw color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Rage indicator color',0)
    }
    visu_checkbox[14] = push_colorpicker('Scopebar color', visu_checkbox[14],visu_intslider[15],visu_intslider[16],visu_intslider[17],255)
    if(visu_checkbox[14] == 1)
    {
    visu_intslider[15] = push_int_slider('R    ', visu_intslider[15], 0, 255);
    visu_intslider[16] = push_int_slider('G    ', visu_intslider[16], 0, 255);
    visu_intslider[17] = push_int_slider('B    ', visu_intslider[17], 0, 255);
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Watermark color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Box color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator font color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill effect color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill draw color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Rage indicator color',0)
    }
    visu_checkbox[15] = push_colorpicker('Fake indicator color', visu_checkbox[15],visu_intslider[18],visu_intslider[19],visu_intslider[20],255)
    if(visu_checkbox[15] == 1)
    {
    visu_intslider[18] = push_int_slider('R     ', visu_intslider[18], 0, 255);
    visu_intslider[19] = push_int_slider('G     ', visu_intslider[19], 0, 255);
    visu_intslider[20] = push_int_slider('B     ', visu_intslider[20], 0, 255);
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Watermark color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Box color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Scopebar color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator font color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill effect color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill draw color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Rage indicator color',0)
    }
    visu_checkbox[16] = push_colorpicker('Fake indicator font color', visu_checkbox[16],visu_intslider[21],visu_intslider[22],visu_intslider[23],255)
    if(visu_checkbox[16] == 1)
    {
    visu_intslider[21] = push_int_slider('R      ', visu_intslider[21], 0, 255);
    visu_intslider[22] = push_int_slider('G      ', visu_intslider[22], 0, 255);
    visu_intslider[23] = push_int_slider('B      ', visu_intslider[23], 0, 255);
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Watermark color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Box color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Scopebar color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill effect color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill draw color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Rage indicator color',0)
    }
    visu_checkbox[20] = push_colorpicker('Rage indicator color', visu_checkbox[20],visu_intslider[30],visu_intslider[31],visu_intslider[32],255)
    if(visu_checkbox[20] == 1)
    {
    visu_intslider[30] = push_int_slider('R         ', visu_intslider[30], 0, 255);
    visu_intslider[31] = push_int_slider('G         ', visu_intslider[31], 0, 255);
    visu_intslider[32] = push_int_slider('B         ', visu_intslider[32], 0, 255);
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Watermark color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Box color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Scopebar color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator font color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill effect color',0)
    }
    visu_checkbox[17] = push_colorpicker('Kill effect color', visu_checkbox[17],visu_intslider[24],visu_intslider[25],visu_intslider[26],255)
    if(visu_checkbox[17] == 1)
    {
    visu_intslider[24] = push_int_slider('R       ', visu_intslider[24], 0, 255);
    visu_intslider[25] = push_int_slider('G       ', visu_intslider[25], 0, 255);
    visu_intslider[26] = push_int_slider('B       ', visu_intslider[26], 0, 255);
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Watermark color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Box color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Scopebar color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator font color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill draw color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Rage indicator color',0)
    }
    visu_checkbox[18] = push_colorpicker('Kill draw color', visu_checkbox[18],visu_intslider[27],visu_intslider[28],visu_intslider[29],255)
    if(visu_checkbox[18] == 1)
    {
    visu_intslider[27] = push_int_slider('R        ', visu_intslider[27], 0, 255);
    visu_intslider[28] = push_int_slider('G        ', visu_intslider[28], 0, 255);
    visu_intslider[29] = push_int_slider('B        ', visu_intslider[29], 0, 255);
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Watermark color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Box color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Scopebar color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake indicator font color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Kill effect color',0)
    UI.SetValue('Misc', 'JAVASCRIPT', 'Script items', 'Rage indicator color',0)
    }
    }
  }
    if (select == 4) {
      set_columns(3);
      if(select2 == 1)
      {
      misc_checkbox[0] = push_checkbox('Enable spammer', misc_checkbox[0])
      misc_dropdown[3] = push_dropdown('spammer mode', misc_dropdown[3], ['Chinese', 'English', 'Russian', 'Clear'])
      misc_dropdown[2] = push_dropdown('music kits', misc_dropdown[2], ['none', 'Default 1', 'Default 2', 'Crimson Assault', 'Sharpened', 'Insurgency', 'AD8', 'High Noon', 'Death\'s Head Demolition', 'Desert Fire', 'LNOE', 'Skog Metal', 'All I Want For Christmas', 'IsoRhythm', 'For No Mankind', 'Hotline Miami', 'Total Domination', 'The Talos Principle', 'Battlepack', 'MOLOTOV', 'Uber Blasto Phone', 'Hazardous Environments', 'II-Headshot', 'The 8-Bit Kit', 'I Am', 'Diamonds', 'Invasion!', 'Lion\'s Mouth', 'Sponge Fingerz', 'Disgusting', 'Java Havana Funkaloo', 'Moments CSGO', 'Aggressive', 'The Good Youth', 'FREE', 'Life\'s Not Out To Get You', 'Backbone', 'GLA', 'III-Arena', 'EZ4ENCE', 'Master Chief Collection', 'King, Scar', 'Anti-Citizen', 'Bachram', 'Gunman Taco Truck', 'Eye of the Dragon', 'M.U.D.D Force', 'Neo Noir', 'Bodacious', 'Drifter']);
      misc_checkbox[3] = push_checkbox('fake rank', misc_checkbox[3])
      push_newline()
      misc_checkbox[4] = push_checkbox('Enable buybot', misc_checkbox[4])
      misc_dropdown[0] = push_dropdown('Primary', misc_dropdown[0], ['autosnipe', 'scout','awp']);
      misc_dropdown[1] = push_dropdown('Secondary', misc_dropdown[1], ['R8/deagle', 'dual elite']);
      misc_checkbox[5] = push_checkbox('Other items', misc_checkbox[5])
    }
    }
    pop_window()
}





//控制中心
var slowwalk = 0
var moving = 0
var static = 0
var local_player = Entity.GetLocalPlayer();
var alive = Entity.IsAlive(Entity.GetLocalPlayer());
var weapon_taken = 0
var firing = 0
var firing_cs = 0
var enemy_firing = 0
var enemy_firing_cs = 0
var firing2 = 0
var firing_cs2 = 0
var enemy_firing2 = 0
var enemy_firing_cs2 = 0
var r_firing = 0
var menu_press = 0
var menu_open = 0
var dang_target = 0
var dang_target_health = 0

function main()
{
  if(Input.IsKeyPressed(36))
  {
    menu_press = 1
  }
  if(menu_press == 1)
  {
    if(!Input.IsKeyPressed(36))
    {
      menu_press = 0
    menu_open++
    if(menu_open > 1)
    {
      menu_open = 0
    }
    Cheat.ExecuteCommand("toggleconsole")
  }
  }
local_player = Entity.GetLocalPlayer();
  if(enemy_firing = 1)
  {
    enemy_firing_cs = enemy_firing_cs - 1
    if(enemy_firing_cs <= 0)
    {
      enemy_firing = 0
      enemy_firing_cs = 0
    }
  }

  if(enemy_firing2 == 1)
  {
    enemy_firing_cs2 = enemy_firing_cs2 - 1
    if(enemy_firing_cs2 <= 0)
    {
      enemy_firing2 = 0
      enemy_firing_cs2 = 0
    }
  }

  if(firing == 1)
  {
    firing_cs = firing_cs - 1
    if(firing_cs <= 0)
    {
      firing = 0
      firing_cs = 0
    }
  }

  if(firing2 == 1)
  {
    firing_cs2 = firing_cs2 - 1
    if(firing_cs2 <= 0)
    {
      firing2 = 0
      firing_cs2 = 0
    }
  }

  if(rage_firing == 1)
  {
    r_firing = r_firing - 1
    if(r_firing <= 0)
    {
      rage_firing = 0
      r_firing = 0
    }
  }
if(Input.IsKeyPressed(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Slow walk key')) == 1)
{
  slowwalk = 1
}
else {
  slowwalk = 0
}

if (Input.IsKeyPressed(0x57) || Input.IsKeyPressed(0x44) || Input.IsKeyPressed(0x41) || Input.IsKeyPressed(0x53))
{
  moving = 1
}
else {
  moving = 0
}

if(slowwalk == 0 && moving == 0)
{
  static = 1
}
else {
  static = 0
}
if(Entity.IsAlive(Entity.GetLocalPlayer()) == 1)
{
  alive = 1
  weapon_taken = Entity.GetName(Entity.GetWeapon(local_player))
    if (weapon_taken == 'scar 20' || weapon_taken == 'g3sg1') {
      weapon_taken = 0
    }
    if (weapon_taken == 'awp') {
      weapon_taken = 4
    }
    if (weapon_taken == 'ssg 08') {
      weapon_taken = 3
    }
    if (weapon_taken == 'r8 revolver' || weapon_taken == 'desert eagle') {
      weapon_taken = 2
    }
    if (weapon_taken == 'p2000' || weapon_taken == 'dual berettas' || weapon_taken == 'p250' || weapon_taken == 'five seven' || weapon_taken == 'glock 18' || weapon_taken == 'tec 9' || weapon_taken == 'cz75 auto' || weapon_taken == 'usp s') {
      weapon_taken = 1
    }
}
else {
  alive = 0
}
  dang_target = get_rage_target(false)
  dang_target_health = Entity.GetProp(dang_target, 'CBasePlayer', 'm_iHealth')
}





//DT
function can_shift_shot(_0x70a4x10d) {
    var _0x70a4x10f = Entity.GetWeapon(local_player);
    if (local_player == null || _0x70a4x10f == null) {
        return false
    };
    var _0x70a4x110 = Entity.GetProp(_0x70a4x10e, 'CCSPlayer', 'm_nTickBase');
    var _0x70a4x111 = Globals.TickInterval() * (_0x70a4x110 - _0x70a4x10d);
    if (_0x70a4x111 < Entity.GetProp(_0x70a4x10e, 'CCSPlayer', 'm_flNextAttack')) {
        return false
    };
    if (_0x70a4x111 < Entity.GetProp(_0x70a4x10f, 'CBaseCombatWeapon', 'm_flNextPrimaryAttack')) {
        return false
    };
    return true
}

var doubletap_enabled = 0
var doubletap_mode = 0
var recharge = 0
function Doubletap()
{
  doubletap_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable Doubletap')
  doubletap_mode = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Doubletap mode')
  var indicator_font = Render.AddFont('Helvetica', 9, 600);
  if(doubletap_enabled == 1)
  {
    if(doubletap_mode == 1)
    {
      UI.SetValue('Rage', 'Exploits', 'Doubletap', 1);
      UI.SetValue('Rage', 'Exploits', 'Doubletap instant', 1);
      if(alive == 1)
      {
        if(indicator_enable == 1)
        {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 27, 1, 'Recharge DT', [185,185,185,255], indicator_font)
        }
    var recharge = Exploit.GetCharge();
    var _0x70a4x114 = 0;
    Exploit[(recharge != 1 ? 'Enable' : 'Disable') + 'Recharge']();
    if (can_shift_shot(2500) && recharge != 1) {
        Exploit.DisableRecharge();
        Exploit.Recharge()
    };
  }
  }
  if(doubletap_mode == 0)
  {
    UI.SetValue('Rage', 'Exploits', 'Doubletap', 1);
    UI.SetValue('Rage', 'Exploits', 'Doubletap instant', 0);
    Exploit.EnableRecharge();
    if(indicator_enable == 1)
    {
      if(alive == 1)
      {
    Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 27, 1, 'Doubletap', [185,185,185,255], indicator_font)
  }
    }
  }
  if(doubletap_mode == 2)
  {
    ragetarget = Entity.GetEnemies()
    mindist = 0
    for (i=0; i < ragetarget.length; i++) {
      if(Entity.IsAlive(ragetarget[i]) == 1)
      {
      distance = Entity.GetRenderOrigin(Entity.GetLocalPlayer())
      distance2 = Entity.GetRenderOrigin(ragetarget[i])
    if(distance[0] > distance2[0])
    {
      db = distance[0] - distance2[0]
    }
    else {
      db = distance2[0] - distance[0]
    }
    if(distance[1] > distance2[1])
    {
      lb = distance[1] - distance2[1]
    }
    else {
      lb = distance2[1] - distance[1]
    }

    dist = Math.sqrt((db*db) + (lb*lb)) - 32
  if(dist < mindist || mindist == 0)
  {
    mindist = dist
    nearest_target = ragetarget[i]
      if((mindist/20) <= 30)
      {
        UI.SetValue('Rage', 'Exploits', 'Doubletap', 1);
        UI.SetValue('Rage', 'Exploits', 'Doubletap instant', 1);
        if(alive == 1)
        {
          if(indicator_enable == 1)
          {
          Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 27, 1, 'Recharge DT', [185,185,185,255], indicator_font)
          }
      var recharge = Exploit.GetCharge();
      var _0x70a4x114 = 0;
      Exploit[(recharge != 1 ? 'Enable' : 'Disable') + 'Recharge']();
      if (can_shift_shot(2500) && recharge != 1) {
          Exploit.DisableRecharge();
          Exploit.Recharge()
      };
    }
      }
      else {
        UI.SetValue('Rage', 'Exploits', 'Doubletap', 1);
        UI.SetValue('Rage', 'Exploits', 'Doubletap instant', 0);
        Exploit.EnableRecharge();
        if(indicator_enable == 1)
        {
          if(alive == 1)
          {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 27, 1, 'Doubletap', [185,185,185,255], indicator_font)
      }
        }
      }
    }
  }
  }
  }
}
  else {
    UI.SetValue('Rage', 'Exploits', 'Doubletap', 0);
    if(indicator_enable == 1)
    {
      if(alive == 1)
      {
    Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 27, 1, 'Doubletap', [55,55,55,255], indicator_font)
  }
    }
  }
}





//自瞄
var rage_enabled = 0
var hc_auto = 0
var dmg_auto = 0
var mps_auto = 0
var dt_mps_auto = 0
var hc_pist = 0
var dmg_pist = 0
var mps_pist = 0
var dt_mps_pist = 0
var hc_hpis = 0
var dmg_hpis = 0
var mps_hpis = 0
var dt_mps_hpis = 0
var hc_scout = 0
var dmg_scout = 0
var mps_scout = 0
var dt_mps_scout = 0
var hc_AWP = 0
var dmg_AWP = 0
var mps_AWP = 0
var dt_mps_AWP = 0
var smart_regulator = 0
var smart_regulator2 = 0
var smart_regulator3 = 0
var smart_regulator4 = 0
var smart_regulator5 = 0
var sl_hc = 0
var sl_dmg = 0
var visible = 0
function Rage()
{
  rage_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable Ragebot')
  UI.SetValue('Rage', 'GENERAL', 'Enabled', 'Enable Ragebot')
    hc_auto = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Hitchance')
    dmg_auto = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Damage[Visible]')
    mps_auto = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Multi-point scale')
    dt_mps_auto = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Multi-point scale')
    hc_pist = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Hitchance ')
    dmg_pist = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Damage[Visible] ')
    mps_pist = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Multi-point scale ')
    dt_mps_pist = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Multi-point scale ')
    hc_hpis = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Hitchance  ')
    dmg_hpis = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Damage[Visible]  ')
    mps_hpis = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Multi-point scale  ')
    dt_mps_hpis = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Multi-point scale  ')
    hc_scout = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Hitchance   ')
    dmg_scout = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Damage[Visible]   ')
    mps_scout = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Multi-point scale   ')
    dt_mps_scout = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Multi-point scale   ')
    hc_AWP = UI.GetValue('Misc', 'JAVASCRIPT', 'Script itemss', 'Minimum Hitchance    ')
    dmg_AWP = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Damage[Visible]    ')
    mps_AWP = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Multi-point scale    ')
    dt_mps_AWP = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Multi-point scale    ')
    for (i=0; i < ragetarget.length; i++) {
      if(Entity.IsAlive(ragetarget[i]) == 1)
      {
      if(is_entity_visible( local_player, ragetarget[i], false ) == true)
      {
        visible = 0
      }
      else {
        visible = 1
      }
      }
      }
    if(visible == 1)
    {
    dmg_auto = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Damage[Unvisible]')
    dmg_pist = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Damage[Unvisible] ')
    dmg_hpis = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Damage[Unvisible]  ')
    dmg_scout = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Damage[Unvisible]   ')
    dmg_AWP = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum Damage[Unvisible]    ')
    }
    if(doubletap_enabled == 1)
    {
    hc_auto = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Hitchance')
    dmg_auto = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Damage[Visible]')
    hc_pist = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Hitchance ')
    dmg_pist = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Damage[Visible] ')
    hc_hpis = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Hitchance  ')
    dmg_hpis = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Damage[Visible]  ')
    hc_scout = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Hitchance   ')
    dmg_scout = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Damage[Visible]   ')
    hc_AWP = UI.GetValue('Misc', 'JAVASCRIPT', 'Script itemss', 'DT Minimum Hitchance    ')
    dmg_AWP = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Damage[Visible]    ')
    if(visible == 0)
    {
    dmg_auto = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Damage[Unvisible]')
    dmg_pist = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Damage[Unvisible] ')
    dmg_hpis = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Damage[Unvisible]  ')
    dmg_scout = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Damage[Unvisible]   ')
    dmg_AWP = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Minimum Damage[Unvisible]    ')
    }
    }
    if(mps_auto < 50)
    {
      mps_auto = mps_auto + 50
    mps_auto = mps_auto / 100
    }
    if(mps_auto > 50)
    {
      mps_auto = mps_auto / 100 * 2
    }
    if(mps_auto == 50)
    {
      mps_auto = 1
    }

    if(mps_pist < 50)
    {
      mps_pist = mps_pist + 50
    mps_pist = mps_pist / 100
    }
    if(mps_pist > 50)
    {
      mps_pist = mps_pist / 100 * 2
    }
    if(mps_pist == 50)
    {
      mps_pist = 1
    }

    if(mps_hpis < 50)
    {
      mps_hpis = mps_hpis + 50
    mps_hpis = mps_hpis / 100
    }
    if(mps_hpis > 50)
    {
      mps_hpis = mps_hpis / 100 * 2
    }
    if(mps_hpis == 50)
    {
      mps_hpis = 1
    }

    if(mps_scout < 50)
    {
      mps_scout = mps_scout + 50
    mps_scout = mps_scout / 100
    }
    if(mps_scout > 50)
    {
      mps_scout = mps_scout / 100 * 2
    }
    if(mps_scout == 50)
    {
      mps_scout = 1
    }

    if(mps_AWP < 50)
    {
      mps_AWP = mps_AWP + 50
    mps_AWP = mps_AWP / 100
    }
    if(mps_AWP > 50)
    {
      mps_AWP = mps_AWP / 100 * 2
    }
    if(mps_AWP == 50)
    {
      mps_AWP = 1
    }

    if(dt_mps_auto < 50)
    {
      dt_mps_auto = dt_mps_auto + 50
    dt_mps_auto = dt_mps_auto / 100
    }
    if(dt_mps_auto > 50)
    {
      dt_mps_auto = dt_mps_auto / 100 * 2
    }
    if(dt_mps_auto == 50)
    {
      dt_mps_auto = 1
    }

    if(dt_mps_pist < 50)
    {
      dt_mps_pist = dt_mps_pist + 50
    dt_mps_pist = dt_mps_pist / 100
    }
    if(dt_mps_pist > 50)
    {
      dt_mps_pist = dt_mps_pist / 100 * 2
    }
    if(dt_mps_pist == 50)
    {
      dt_mps_pist = 1
    }

    if(dt_mps_hpis < 50)
    {
      dt_mps_hpis = dt_mps_hpis + 50
    dt_mps_hpis = dt_mps_hpis / 100
    }
    if(dt_mps_hpis > 50)
    {
      dt_mps_hpis = dt_mps_hpis / 100 * 2
    }
    if(dt_mps_hpis == 50)
    {
      dt_mps_hpis = 1
    }

    if(dt_mps_scout < 50)
    {
      dt_mps_scout = dt_mps_scout + 50
    dt_mps_scout = dt_mps_scout / 100
    }
    if(dt_mps_scout > 50)
    {
      dt_mps_scout = dt_mps_scout / 100 * 2
    }
    if(dt_mps_scout == 50)
    {
      dt_mps_scout = 1
    }

    if(dt_mps_AWP < 50)
    {
      dt_mps_AWP = dt_mps_AWP + 50
    dt_mps_AWP = dt_mps_AWP / 100
    }
    if(dt_mps_AWP > 50)
    {
      dt_mps_AWP = dt_mps_AWP / 100 * 2
    }
    if(dt_mps_AWP == 50)
    {
      dt_mps_AWP = 1
    }
    smart_regulator = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Smart Regulator')
    smart_regulator2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Smart Regulator ')
    smart_regulator3 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Smart Regulator  ')
    smart_regulator4 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Smart Regulator   ')
    smart_regulator5 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Smart Regulator    ')
    dt_smart_regulator = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Smart Regulator')
    dt_smart_regulator2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Smart Regulator ')
    dt_smart_regulator3 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Smart Regulator  ')
    dt_smart_regulator4 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Smart Regulator   ')
    dt_smart_regulator5 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'DT Smart Regulator    ')
    UI.SetValue('Rage', 'AUTOSNIPE', 'Accuracy', 'Hitchance', hc_auto)
    UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dmg_auto)
    UI.SetValue('Rage', 'PISTOL', 'Accuracy', 'Hitchance', hc_pist)
    UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dmg_pist)
    UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy', 'Hitchance', hc_hpis)
    UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dmg_hpis)
    UI.SetValue('Rage', 'SCOUT', 'Accuracy', 'Hitchance', hc_scout)
    UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dmg_scout)
    UI.SetValue('Rage', 'AWP', 'Accuracy', 'Hitchance', hc_AWP)
    UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dmg_AWP)

    if(doubletap_enabled == 0)
    {
      if(moving == 1)
      {
        if(smart_regulator == 1)
        {
        UI.SetValue('Rage', 'AUTOSNIPE', 'Accuracy', 'Hitchance', hc_auto * mps_auto )
        if(mps_auto > 50)
        {
        UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dmg_auto * mps_auto * 2.75)
        }
        else {
          UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dmg_auto * ((mps_auto + 1) / 2) )
        }
      }
      if(smart_regulator2 == 1)
      {
        UI.SetValue('Rage', 'PISTOL', 'Accuracy', 'Hitchance', hc_pist * mps_pist )
        if(mps_pist > 50)
        {
        UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dmg_pist * mps_pist * 2.75)
        }
        else {
          UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dmg_pist * ((mps_pist + 1) / 2) )
        }
      }
      if(smart_regulator3 == 1)
      {
        UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy', 'Hitchance', hc_hpis * mps_hpis )
        if(mps_hpis > 50)
        {
        UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dmg_hpis * mps_hpis * 2.75)
        }
        else {
          UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dmg_hpis * ((mps_hpis + 1) / 2) )
        }
      }
      if(smart_regulator4 == 1)
      {
        UI.SetValue('Rage', 'SCOUT', 'Accuracy', 'Hitchance', hc_scout * mps_scout )
        if(mps_scout > 50)
        {
        UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dmg_scout * mps_scout * 2.75)
        }
        else {
          UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dmg_scout * ((mps_scout + 1) / 2) )
        }
      }
      if(smart_regulator5 == 1)
      {
        UI.SetValue('Rage', 'AWP', 'Accuracy', 'Hitchance', hc_AWP * mps_AWP )
        if(mps_AWP > 50)
        {
        UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dmg_AWP * mps_AWP * 2.75)
        }
        else {
          UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dmg_AWP * ((mps_AWP + 1) / 2) )
        }
      }
      }

      mps_auto = mps_auto * ((30 + speed)/100 * 2)
      mps_pist = mps_pist * ((30 + speed)/100 * 2)
      mps_hpis = mps_hpis * ((30 + speed)/100 * 2)
      mps_scout = mps_scout * ((30 + speed)/100 * 2)
      mps_AWP = mps_AWP * ((30 + speed)/100 * 2)


      if(slowwalk == 1)
      {
        if(smart_regulator == 1)
        {
        UI.SetValue('Rage', 'AUTOSNIPE', 'Accuracy', 'Hitchance', hc_auto * mps_auto )
        if(mps_auto > 50)
        {
        UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dmg_auto * mps_auto * 2.75)
        }
        else {
          UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dmg_auto * ((mps_auto + 1) / 2) )
        }
      }
        if(smart_regulator2 == 1)
        {
        UI.SetValue('Rage', 'PISTOL', 'Accuracy', 'Hitchance', hc_pist * mps_pist )
        if(mps_pist > 50)
        {
        UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dmg_pist * mps_pist * 2.75)
        }
        else {
          UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dmg_pist * ((mps_pist + 1) / 2) )
        }
      }
        if(smart_regulator3 == 1)
        {
        UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy', 'Hitchance', hc_hpis * mps_hpis )
        if(mps_hpis > 50)
        {
        UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dmg_hpis * mps_hpis * 2.75)
        }
        else {
          UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dmg_hpis * ((mps_hpis + 1) / 2) )
        }
      }
      if(smart_regulator4 == 1)
      {
        UI.SetValue('Rage', 'SCOUT', 'Accuracy', 'Hitchance', hc_scout * mps_scout )
        if(mps_scout > 50)
        {
        UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dmg_scout * mps_scout * 2.75)
        }
        else {
          UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dmg_scout * ((mps_scout + 1) / 2) )
        }
      }
      if(smart_regulator5 == 1)
      {
        UI.SetValue('Rage', 'AWP', 'Accuracy', 'Hitchance', hc_AWP * mps_AWP )
        if(mps_AWP > 50)
        {
        UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dmg_AWP * mps_AWP * 2.75)
        }
        else {
          UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dmg_AWP * ((mps_AWP + 1) / 2) )
        }
      }
      }
    }
      if(doubletap_enabled == 1)
      {
        if(moving == 1)
        {
          if(dt_smart_regulator == 1)
          {
          UI.SetValue('Rage', 'AUTOSNIPE', 'Accuracy', 'Hitchance', hc_auto * dt_mps_auto )
          if(dt_mps_auto > 50)
          {
          UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dmg_auto * dt_mps_auto * 2.75)
          }
          else {
            UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dmg_auto * ((dt_mps_auto + 1) / 2) )
          }
        }
        if(dt_smart_regulator2 == 1)
        {
          UI.SetValue('Rage', 'PISTOL', 'Accuracy', 'Hitchance', hc_pist * dt_mps_pist )
          if(dt_mps_pist > 50)
          {
          UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dmg_pist * dt_mps_pist * 2.75)
          }
          else {
            UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dmg_pist * ((dt_mps_pist + 1) / 2) )
          }
        }
        if(dt_smart_regulator3 == 1)
        {
          UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy', 'Hitchance', hc_hpis * dt_mps_hpis )
          if(dt_mps_hpis > 50)
          {
          UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dmg_hpis * dt_mps_hpis * 2.75)
          }
          else {
            UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dmg_hpis * ((dt_mps_hpis + 1) / 2) )
          }
        }
        if(dt_smart_regulator4 == 1)
        {
          UI.SetValue('Rage', 'SCOUT', 'Accuracy', 'Hitchance', hc_scout * dt_mps_scout )
          if(dt_mps_scout > 50)
          {
          UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dmg_scout * dt_mps_scout * 2.75)
          }
          else {
            UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dmg_scout * ((dt_mps_scout + 1) / 2) )
          }
        }
        if(dt_smart_regulator5 == 1)
        {
          UI.SetValue('Rage', 'AWP', 'Accuracy', 'Hitchance', hc_AWP * dt_mps_AWP )
          if(dt_mps_AWP > 50)
          {
          UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dmg_AWP * dt_mps_AWP * 2.75)
          }
          else {
            UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dmg_AWP * ((dt_mps_AWP + 1) / 2) )
          }
        }
        }

        dt_mps_auto = dt_mps_auto * ((30 + speed)/100 * 1.5)
        dt_mps_pist = dt_mps_pist * ((30 + speed)/100 * 1.5)
        dt_mps_hpis = dt_mps_hpis * ((30 + speed)/100 * 1.5)
        dt_mps_scout = dt_mps_scout * ((30 + speed)/100 * 1.5)
        dt_mps_AWP = dt_mps_AWP * ((30 + speed)/100 * 1.5)


        if(slowwalk == 1)
        {
          if(dt_smart_regulator == 1)
          {
          UI.SetValue('Rage', 'AUTOSNIPE', 'Accuracy', 'Hitchance', hc_auto * dt_mps_auto )
          if(dt_mps_auto > 50)
          {
          UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dmg_auto * dt_mps_auto * 2.75)
          }
          else {
            UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dmg_auto * ((dt_mps_auto + 1) / 2) )
          }
        }
          if(dt_smart_regulator2 == 1)
          {
          UI.SetValue('Rage', 'PISTOL', 'Accuracy', 'Hitchance', hc_pist * dt_mps_pist )
          if(dt_mps_pist > 50)
          {
          UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dmg_pist * dt_mps_pist * 2.75)
          }
          else {
            UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dmg_pist * ((dt_mps_pist + 1) / 2) )
          }
        }
          if(dt_smart_regulator3 == 1)
          {
          UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy', 'Hitchance', hc_hpis * dt_mps_hpis )
          if(dt_mps_hpis > 50)
          {
          UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dmg_hpis * dt_mps_hpis * 2.75)
          }
          else {
            UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dmg_hpis * ((dt_mps_hpis + 1) / 2) )
          }
        }
        if(dt_smart_regulator4 == 1)
        {
          UI.SetValue('Rage', 'SCOUT', 'Accuracy', 'Hitchance', hc_scout * dt_mps_scout )
          if(dt_mps_scout > 50)
          {
          UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dmg_scout * dt_mps_scout * 2.75)
          }
          else {
            UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dmg_scout * ((dt_mps_scout + 1) / 2) )
          }
        }
        if(dt_smart_regulator5 == 1)
        {
          UI.SetValue('Rage', 'AWP', 'Accuracy', 'Hitchance', hc_AWP * dt_mps_AWP )
          if(dt_mps_AWP > 50)
          {
          UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dmg_AWP * dt_mps_AWP * 2.75)
          }
          else {
            UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dmg_AWP * ((dt_mps_AWP + 1) / 2) )
          }
        }
        }
      }
}





//rage其他
var auto_baim = 0
var auto_sp = 0
var pistol_baim = 0
var pistol_sp = 0
var hpistol_baim = 0
var hpistol_sp = 0
var scout_baim = 0
var scout_sp = 0
var awp_baim = 0
var awp_sp = 0

var auto_baim2 = 0
var auto_sp2 = 0
var pistol_baim2 = 0
var pistol_sp2 = 0
var hpistol_baim2 = 0
var hpistol_sp2 = 0
var scout_baim2 = 0
var scout_sp2 = 0
var awp_baim2 = 0
var awp_sp2 = 0
var auto_lethal = 0
var pist_lethal = 0
var hpis_lethal = 0
var scout_lethal = 0
var awp_lethal = 0
var auto_autobaim = 0
var pist_autobaim = 0
var hpis_autobaim = 0
var scout_autobaim = 0
var awp_autobaim = 0
var auto_baimed = 0
var pist_baimed = 0
var hpis_baimed = 0
var scout_baimed = 0
var awp_baimed = 0
function Rage2()
{
   auto_baim = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Baim Aftershot')
   auto_sp = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Safe Point Aftershot')
   pistol_baim = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Baim Aftershot ')
   pistol_sp = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Safe Point Aftershot ')
   hpistol_baim = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Baim Aftershot  ')
   hpistol_sp = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Safe Point Aftershot  ')
   scout_baim = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Baim Aftershot   ')
   scout_sp = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Safe Point Aftershot   ')
   awp_baim = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Baim Aftershot    ')
   awp_sp = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Safe Point Aftershot    ')
   auto_lethal = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Lethal mode')
   pist_lethal = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Lethal mode ')
   hpis_lethal = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Lethal mode  ')
   scout_lethal = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Lethal mode   ')
   awp_lethal = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Lethal mode    ')
   auto_autobaim = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Auto baim mode')
   pist_autobaim = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Auto baim mode ')
   hpis_autobaim = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Auto baim mode  ')
   scout_autobaim = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Auto baim mode   ')
   awp_autobaim = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Auto baim mode    ')
   if(auto_baimed == 1)
   {
     auto_baimed = 0
     UI.SetValue('Rage', 'AUTOSNIPER', 'Accuracy','Prefer body aim',0);
   }
   if(pist_baimed == 1)
   {
     pist_baimed = 0
     UI.SetValue('Rage', 'PISTOL', 'Accuracy','Prefer body aim',0);
   }
   if(hpis_baimed == 1)
   {
     hpis_baimed = 0
     UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer body aim',0);
   }
   if(scout_baimed == 1)
   {
     scout_baimed = 0
     UI.SetValue('Rage', 'SCOUT', 'Accuracy','Prefer body aim',0);
   }
   if(awp_baimed == 1)
   {
     awp_baimed = 0
     UI.SetValue('Rage', 'AWP', 'Accuracy','Prefer body aim',0);
   }
   if(firing2 == 1)
   {
     if(weapon_taken == 0)
     {
       if(auto_baim == 1)
       {
         if(UI.GetValue('Rage', 'AUTOSNIPE', 'Accuracy','Prefer body aim') == 0)
         {
         UI.SetValue('Rage', 'AUTOSNIPE', 'Accuracy','Prefer body aim',1);
         auto_baim2 = 1
         }
       }
       if(auto_sp == 1)
       {
         if(UI.GetValue('Rage', 'AUTOSNIPE', 'Accuracy','Prefer safe point') == 0)
         {
         UI.SetValue('Rage', 'AUTOSNIPE', 'Accuracy','Prefer safe point',1);
         auto_sp2 = 1
         }
       }
     }

     if(weapon_taken == 1)
     {
       if(pistol_baim == 1)
       {
         if(UI.GetValue('Rage', 'PISTOL', 'Accuracy','Prefer body aim') == 0)
         {
         UI.SetValue('Rage', 'PISTOL', 'Accuracy','Prefer body aim',1);
         pistol_baim2 = 1
         }
       }
       if(pistol_sp == 1)
       {
         if(UI.GetValue('Rage', 'PISTOL', 'Accuracy','Prefer safe point') == 0)
         {
         UI.SetValue('Rage', 'PISTOL', 'Accuracy','Prefer safe point',1);
         pistol_sp2 = 1
         }
       }
     }

     if(weapon_taken == 2)
     {
       if(hpistol_baim == 1)
       {
         if(UI.GetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer body aim') == 0)
         {
         UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer body aim',1);
         hpistol_baim2 = 1
         }
       }
       if(hpistol_sp == 1)
       {
         if(UI.GetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer safe point') == 0)
         {
         UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer safe point',1);
         hpistol_sp2 = 1
         }
       }
     }

     if(weapon_taken == 3)
     {
       if(scout_baim == 1)
       {
         if(UI.GetValue('Rage', 'SCOUT', 'Accuracy','Prefer body aim') == 0)
         {
         UI.SetValue('Rage', 'SCOUT', 'Accuracy','Prefer body aim',1);
         scout_baim2 = 1
         }
       }
       if(scout_sp == 1)
       {
         if(UI.GetValue('Rage', 'SCOUT', 'Accuracy','Prefer safe point') == 0)
         {
         UI.SetValue('Rage', 'SCOUT', 'Accuracy','Prefer safe point',1);
         scout_sp2 = 1
         }
       }
     }

     if(weapon_taken == 4)
     {
       if(awp_baim == 1)
       {
         if(UI.GetValue('Rage', 'AWP', 'Accuracy','Prefer body aim') == 0)
         {
         UI.SetValue('Rage', 'AWP', 'Accuracy','Prefer body aim',1);
         awp_baim2 = 1
         }
       }
       if(awp_sp == 1)
       {
         if(UI.GetValue('Rage', 'AWP', 'Accuracy','Prefer safe point') == 0)
         {
         UI.SetValue('Rage', 'AWP', 'Accuracy','Prefer safe point',1);
         awp_sp2 = 1
         }
       }
     }
   }
   else {
     if(auto_baim2 == 1)
     {
       auto_baim2 = 0
       UI.SetValue('Rage', 'AUTOSNIPE', 'Accuracy','Prefer body aim',0);
     }
     if(auto_sp2 == 1)
     {
       auto_sp2 = 0
       UI.SetValue('Rage', 'AUTOSNIPE', 'Accuracy','Prefer safe point',0);
     }

     if(pistol_baim2 == 1)
     {
       pistol_baim2 = 0
       UI.SetValue('Rage', 'PISTOL', 'Accuracy','Prefer body aim',0);
     }
     if(pistol_sp2 == 1)
     {
       pistol_sp2 = 0
       UI.SetValue('Rage', 'PISTOL', 'Accuracy','Prefer safe point',0);
     }

     if(hpistol_baim2 == 1)
     {
       hpistol_baim2 = 0
       UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer body aim',0);
     }
     if(hpistol_sp2 == 1)
     {
       hpistol_sp2 = 0
       UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer safe point',0);
     }

     if(scout_baim2 == 1)
     {
       scout_baim2 = 0
       UI.SetValue('Rage', 'SCOUT', 'Accuracy','Prefer body aim',0);
     }
     if(scout_sp2 == 1)
     {
       scout_sp2 = 0
       UI.SetValue('Rage', 'SCOUT', 'Accuracy','Prefer safe point',0);
     }

     if(awp_baim2 == 1)
     {
       awp_baim2 = 0
       UI.SetValue('Rage', 'AWP', 'Accuracy','Prefer body aim',0);
     }
     if(awp_sp2 == 1)
     {
       awp_sp2 = 0
       UI.SetValue('Rage', 'AWP', 'Accuracy','Prefer safe point',0);
     }
   }
   if(weapon_taken == 0)
   {
     if(auto_lethal == 1)
     {
       if(dang_target_health > dmg_auto)
       {
       UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dang_target_health)
       }
     }
     if(auto_lethal == 2)
     {
       if(dang_target_health*0.9 > dmg_auto)
       {
       UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dang_target_health * 0.9)
       }
     }
     if(auto_lethal == 3)
     {
       if(dang_target_health*0.5 > dmg_auto)
       {
       UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting', 'Minimum damage', dang_target_health * 0.5)
       }
     }
   }
   if(weapon_taken == 1)
   {
     if(pist_lethal == 1)
     {
       if(dang_target_health > dmg_pist)
       {
       UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dang_target_health)
       }
     }
     if(pist_lethal == 2)
     {
       if(dang_target_health*0.9 > dmg_pist)
       {
       UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dang_target_health * 0.9)
     }
     }
     if(pist_lethal == 3)
     {
       if(dang_target_health*0.5 > dmg_pist)
       {
       UI.SetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage', dang_target_health * 0.5)
     }
     }
   }
   if(weapon_taken == 2)
   {
     if(hpis_lethal == 1)
     {
       if(dang_target_health > dmg_hpis)
       {
       UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dang_target_health)
     }
     }
     if(hpis_lethal == 2)
     {
       if(dang_target_health*0.9 > dmg_hpis)
       {
       UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dang_target_health * 0.9)
     }
     }
     if(hpis_lethal == 3)
     {
       if(dang_target_health*0.5 > dmg_hpis)
       {
       UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage', dang_target_health * 0.5)
     }
     }
   }
   if(weapon_taken == 3)
   {
     if(scout_lethal == 1)
     {
       if(dang_target_health > dmg_scout)
       {
       UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dang_target_health)
       }
     }
     if(scout_lethal == 2)
     {
       if(dang_target_health*0.9 > dmg_scout)
       {
       UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dang_target_health * 0.9)
       }
     }
     if(scout_lethal == 3)
     {
       if(dang_target_health*0.5 > dmg_scout)
       {
       UI.SetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage', dang_target_health * 0.5)
       }
     }
   }
   if(weapon_taken == 4)
   {
     if(awp_lethal == 1)
     {
       if(dang_target_health > dmg_AWP)
       {
       UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dang_target_health)
       }
     }
     if(awp_lethal == 2)
     {
       if(dang_target_health*0.9 > dmg_AWP)
       {
       UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dang_target_health * 0.9)
     }
     }
     if(awp_lethal == 3)
     {
       if(dang_target_health*0.5 > dmg_AWP)
       {
       UI.SetValue('Rage', 'AWP', 'Targeting', 'Minimum damage', dang_target_health * 0.5)
     }
     }
   }
   if(weapon_taken == 0)
   {
     if(auto_autobaim == 1)
     {
       if(dang_target_health >= 65)
       {
         UI.SetValue('Rage', 'AUTOSNIPER', 'Accuracy','Prefer body aim',1);
         auto_baimed = 1
       }
     }
     if(auto_autobaim == 2)
     {
       if(dang_target_health < 65)
       {
         UI.SetValue('Rage', 'AUTOSNIPER', 'Accuracy','Prefer body aim',1);
         auto_baimed = 1
       }
     }
     if(auto_autobaim == 3)
     {
       if(dang_target_health <= 40)
       {
         UI.SetValue('Rage', 'AUTOSNIPER', 'Accuracy','Prefer body aim',1);
         auto_baimed = 1
       }
     }
   }
   if(weapon_taken == 1)
   {
     if(pist_autobaim == 1)
     {
       if(dang_target_health >= 65)
       {
         UI.SetValue('Rage', 'PISTOL', 'Accuracy','Prefer body aim',1);
         pist_baimed = 1
       }
     }
     if(pist_autobaim == 2)
     {
       if(dang_target_health < 65)
       {
         UI.SetValue('Rage', 'PISTOL', 'Accuracy','Prefer body aim',1);
         pist_baimed = 1
       }
     }
     if(pist_autobaim == 3)
     {
       if(dang_target_health <= 40)
       {
         UI.SetValue('Rage', 'PISTOL', 'Accuracy','Prefer body aim',1);
         pist_baimed = 1
       }
     }
   }
   if(weapon_taken == 2)
   {
     if(hpis_autobaim == 1)
     {
       if(dang_target_health >= 65)
       {
         UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer body aim',1);
         hpis_baimed = 1
       }
     }
     if(hpis_autobaim == 2)
     {
       if(dang_target_health < 65)
       {
         UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer body aim',1);
         hpis_baimed = 1
       }
     }
     if(hpis_autobaim == 3)
     {
       if(dang_target_health <= 40)
       {
         UI.SetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer body aim',1);
         hpis_baimed = 1
       }
     }
   }
   if(weapon_taken == 3)
   {
     if(scout_autobaim == 1)
     {
       if(dang_target_health >= 65)
       {
         UI.SetValue('Rage', 'SCOUT', 'Accuracy','Prefer body aim',1);
         scout_baimed = 1
       }
     }
     if(scout_autobaim == 2)
     {
       if(dang_target_health < 65)
       {
         UI.SetValue('Rage', 'SCOUT', 'Accuracy','Prefer body aim',1);
         scout_baimed = 1
       }
     }
     if(scout_autobaim == 3)
     {
       if(dang_target_health <= 40)
       {
         UI.SetValue('Rage', 'SCOUT', 'Accuracy','Prefer body aim',1);
         scout_baimed = 1
       }
     }
   }
   if(weapon_taken == 4)
   {
     if(awp_autobaim == 1)
     {
       if(dang_target_health >= 65)
       {
         UI.SetValue('Rage', 'AWP', 'Accuracy','Prefer body aim',1);
         awp_baimed = 1
       }
     }
     if(awp_autobaim == 2)
     {
       if(dang_target_health < 65)
       {
         UI.SetValue('Rage', 'AWP', 'Accuracy','Prefer body aim',1);
         awp_baimed = 1
       }
     }
     if(awp_autobaim == 3)
     {
       if(dang_target_health <= 40)
       {
         UI.SetValue('Rage', 'AWP', 'Accuracy','Prefer body aim',1);
         awp_baimed = 1
       }
     }
   }
}





//只抓抬头
var auto_os = 0
var pistol_os = 0
var hpistol_os = 0
var scout_os = 0
var awp_os = 0
function only_onshot()
{
  auto_os = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Only On Shot')
  pistol_os = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Only On Shot ')
  hpistol_os = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Only On Shot  ')
  scout_os = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Only On Shot   ')
  awp_os = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Only On Shot    ')
  if (weapon_taken == 0) {
    if(auto_os == 1)
    {
      UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting','FOV',0);
      if(enemy_firing == 1)
      {
        UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting','FOV',180);
      }
    }
    else {
      UI.SetValue('Rage', 'AUTOSNIPE', 'Targeting','FOV',180);
    }
}

if (weapon_taken == 1) {
  if(pistol_os == 1)
  {
    UI.SetValue('Rage', 'PISTOL', 'Targeting','FOV',0);
    if(enemy_firing == 1)
    {
      UI.SetValue('Rage', 'PISTOL', 'Targeting','FOV',180);
    }
  }
  else {
    UI.SetValue('Rage', 'PISTOL', 'Targeting','FOV',180);
  }
}

if (weapon_taken == 2) {
  if(hpistol_os == 1)
  {
    UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting','FOV',0);
    if(enemy_firing == 1)
    {
      UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting','FOV',180);
    }
  }
  else {
    UI.SetValue('Rage', 'HEAVY PISTOL', 'Targeting','FOV',180);
  }
}

if (weapon_taken == 3) {
  if(scout_os == 1)
  {
    UI.SetValue('Rage', 'SCOUT', 'Targeting','FOV',0);
    if(enemy_firing == 1)
    {
      UI.SetValue('Rage', 'SCOUT', 'Targeting','FOV',180);
    }
  }
  else {
    UI.SetValue('Rage', 'SCOUT', 'Targeting','FOV',180);
  }
}

if (weapon_taken == 4) {
  if(awp_os == 1)
  {
    UI.SetValue('Rage', 'AWP', 'Targeting','FOV',0);
    if(enemy_firing == 1)
    {
      UI.SetValue('Rage', 'AWP', 'Targeting','FOV',180);
    }
  }
  else {
    UI.SetValue('Rage', 'AWP', 'Targeting','FOV',180);
  }
}
}




//自动急停
var auto_autostop = 0
var pistol_autostop = 0
var hpistol_autostop = 0
var scout_autostop = 0
var awp_autostop = 0
var auto_enabled = 0
var pistol_enabled = 0
var hpistol_enabled = 0
var scout_enabled = 0
var awp_enabled = 0
var as_dir = [0,0,0]
function autostop()
{
  auto_autostop = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Autostop Speed')
  pistol_autostop = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Autostop Speed ')
  hpistol_autostop = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Autostop Speed  ')
  scout_autostop = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Autostop Speed   ')
  awp_autostop = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Autostop Speed    ')
  auto_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable Autostop')
  pistol_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable Autostop ')
  hpistol_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable Autostop  ')
  scout_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable Autostop   ')
  awp_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable Autostop    ')
  if(firing == 1)
  {
    if(weapon_taken == 0)
    {
      if(auto_enabled == 1)
      {
        as_dir = [0,0,0]
        if (Input.IsKeyPressed(0x57)) {
            as_dir[0] += auto_autostop
        };
        if (Input.IsKeyPressed(0x44)) {
            as_dir[1] += auto_autostop * 2.25
        };
        if (Input.IsKeyPressed(0x41)) {
            as_dir[1] -= auto_autostop * 2.25
        };
        if (Input.IsKeyPressed(0x53)) {
            as_dir[0] -= auto_autostop
        };
        UserCMD.SetMovement(as_dir);
      }
    }

    if(weapon_taken == 1)
    {
      if(pistol_enabled == 1)
      {
        as_dir = [0,0,0]
        if (Input.IsKeyPressed(0x57)) {
            as_dir[0] += pistol_autostop
        };
        if (Input.IsKeyPressed(0x44)) {
            as_dir[1] += pistol_autostop * 2.25
        };
        if (Input.IsKeyPressed(0x41)) {
            as_dir[1] -= pistol_autostop * 2.25
        };
        if (Input.IsKeyPressed(0x53)) {
            as_dir[0] -= pistol_autostop
        };
        UserCMD.SetMovement(as_dir);
      }
    }

    if(weapon_taken == 2)
    {
      if(hpistol_enabled == 1)
      {
        as_dir = [0,0,0]
        if (as_dir.IsKeyPressed(0x57)) {
            dir[0] += hpistol_autostop
        };
        if (Input.IsKeyPressed(0x44)) {
            as_dir[1] += hpistol_autostop * 2.25
        };
        if (Input.IsKeyPressed(0x41)) {
            as_dir[1] -= hpistol_autostop * 2.25
        };
        if (Input.IsKeyPressed(0x53)) {
            as_dir[0] -= hpistol_autostop
        };
        UserCMD.SetMovement(as_dir);
      }
    }

    if(weapon_taken == 3)
    {
      if(scout_enabled == 1)
      {
        as_dir = [0,0,0]
        if (Input.IsKeyPressed(0x57)) {
            as_dir[0] += scout_autostop
        };
        if (Input.IsKeyPressed(0x44)) {
            as_dir[1] += scout_autostop * 2.25
        };
        if (Input.IsKeyPressed(0x41)) {
            as_dir[1] -= scout_autostop * 2.25
        };
        if (Input.IsKeyPressed(0x53)) {
            as_dir[0] -= scout_autostop
        };
        UserCMD.SetMovement(as_dir);
      }
    }

    if(weapon_taken == 4)
    {
      if(awp_enabled == 1)
      {
        as_dir = [0,0,0]
        if (Input.IsKeyPressed(0x57)) {
            as_dir[0] += awp_autostop
        };
        if (Input.IsKeyPressed(0x44)) {
            as_dir[1] += awp_autostop * 2.25
        };
        if (Input.IsKeyPressed(0x41)) {
            as_dir[1] -= awp_autostop * 2.25
        };
        if (Input.IsKeyPressed(0x53)) {
            as_dir[0] -= awp_autostop
        };
        UserCMD.SetMovement(as_dir);
      }
    }
  }
}





//假身
var aa_enabled = 0
var aa_static = 0
var aa_moving = 0
var aa_slowwalk = 0
var jitter_static = 0
var jitter_moving = 0
var jitter_slowwalk = 0
var aa_static2 = 0
var aa_moving2 = 0
var aa_slowwalk2 = 0
var jitter_static2 = 0
var jitter_moving2 = 0
var jitter_slowwalk2 = 0
var jitter_mode = 0
var direction = 0
var leg_break_enable = 0
var leg_break = 0
var lby_static = 0
var lby_moving = 0
var lby_slowwalk = 0
var lby_jitter = 0
function Anti_aim_angles()
{
  aa_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable Anti-Aim')
  UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Enabled', aa_enabled);
  if(aa_enabled == 1)
  {
    AntiAim.SetOverride(0);
    aa_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable Anti-Aim')

    pitch = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Pitch')
    yaw = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw')
    yaw_base = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw base')

    aa_static = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw add')
    aa_moving = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw add ')
    aa_slowwalk = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw add  ')
    aa_static2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw add inverter')
    aa_moving2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw add inverter ')
    aa_slowwalk2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw add inverter  ')
    jitter_static = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw jitter')
    jitter_moving = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw jitter ')
    jitter_slowwalk = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw jitter  ')
    jitter_mode = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Jitter mode')
    leg_break_enable = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Leg Break')

    lby_static = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Lower body yaw')
    lby_moving = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Lower body yaw ')
    lby_slowwalk = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Lower body yaw  ')
    UI.SetValue('Anti-Aim', 'Extra', 'Pitch', pitch);
    if (yaw_base == 0) {
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'At targets', 0)
    } else {
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'At targets', 1)
    }

    if (UI.IsHotkeyActive('Anti-Aim', 'Fake angles', 'Inverter') == 1)
    {
      direction = 0
    }
    else
    {
      direction = 1
    }
      if(static == 1)
      {
        if(direction == 1)
        {
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset',aa_static);
        }
        else {
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset',aa_static2);
        }
        if(jitter_mode == 1)
        {
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset',jitter_static);
        }
        else {
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset',0);
        }
        if(jitter_mode == 2)
        {
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset',Math['round'](Math['random']() * (jitter_static - 1)));
        }
        UI.SetValue('Anti-Aim', 'Fake angles', 'LBY mode',lby_static);
      }

      if(moving == 1)
      {
        if(direction == 1)
        {
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset',aa_moving);
        }
        else {
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset',aa_moving2);
        }
        if(jitter_mode == 1)
        {
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset',jitter_moving);
        }
        else {
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset',0);
        }
        if(jitter_mode == 2)
        {
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset',Math['round'](Math['random']() * (jitter_moving - 1)));
        }
        UI.SetValue('Anti-Aim', 'Fake angles', 'LBY mode',lby_moving);
      }

      if(slowwalk == 1)
      {
        if(direction == 1)
        {
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset',aa_slowwalk);
        }
        else {
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset',aa_slowwalk2);
        }
        if(jitter_mode == 1)
        {
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset',jitter_slowwalk);
        }
        else {
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset',0);
        }
        if(jitter_mode == 2)
        {
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset',Math['round'](Math['random']() * (jitter_slowwalk - 1)));
        }
        UI.SetValue('Anti-Aim', 'Fake angles', 'LBY mode',lby_slowwalk);
      }
    if (yaw == 0) {
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset', 180)
    }
    if(leg_break_enable == 1)
    {
      leg_break++
      if(leg_break > 1)
      {
        leg_break = 0
      }
      if(leg_break == 0)
      {
        UI.SetValue('Misc', 'GENERAL', 'Movement', 'Slide walk',1)
      }
      else {
        UI.SetValue('Misc', 'GENERAL', 'Movement', 'Slide walk',0)
      }
    }
    if(direction == 1)
    {
    if(static == 1)
    {
      if(lby_static == 3)
      {
        lby_jitter++
        if(lby_jitter == 2)
        {
          lby_jitter = 0
          AntiAim.SetOverride(1);
          AntiAim.SetFakeOffset(aa_static-15);
          AntiAim.SetRealOffset(-30 - Math.ceil(Math.random()*15));
          AntiAim.SetLBYOffset(15)
        }
        if(lby_jitter == 1)
        {
          AntiAim.SetOverride(1);
          AntiAim.SetFakeOffset(aa_static);
          AntiAim.SetRealOffset(-50 - Math.ceil(Math.random()*15));
          AntiAim.SetLBYOffset(15)
        }
      }
    }
    if(moving == 1)
    {
      if(slowwalk == 0)
      {
      if(lby_moving == 3)
      {
        lby_jitter++
        if(lby_jitter == 2)
        {
          lby_jitter = 0
          AntiAim.SetOverride(1);
          AntiAim.SetFakeOffset(aa_moving+15);
          AntiAim.SetRealOffset(-30 - Math.ceil(Math.random()*15));
          AntiAim.SetLBYOffset(15)
        }
        if(lby_jitter == 1)
        {
          AntiAim.SetOverride(1);
          AntiAim.SetFakeOffset(aa_moving);
          AntiAim.SetRealOffset(-50 - Math.ceil(Math.random()*15));
          AntiAim.SetLBYOffset(15)
        }
      }
      }
    }
    if(slowwalk == 1)
    {
      if(lby_slowwalk == 3)
      {
        lby_jitter++
        if(lby_jitter == 2)
        {
          lby_jitter = 0
          AntiAim.SetOverride(1);
          AntiAim.SetFakeOffset(aa_slowwalk+15);
          AntiAim.SetRealOffset(-30 - Math.ceil(Math.random()*15));
          AntiAim.SetLBYOffset(15)
        }
        if(lby_jitter == 1)
        {
          AntiAim.SetOverride(1);
          AntiAim.SetFakeOffset(aa_slowwalk);
          AntiAim.SetRealOffset(-50 - Math.ceil(Math.random()*15));
          AntiAim.SetLBYOffset(15)
        }
      }
    }
    }
    else {
      if(static == 1)
      {
        if(lby_static == 3)
        {
          lby_jitter++
          if(lby_jitter == 2)
          {
            lby_jitter = 0
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(aa_static-15);
            AntiAim.SetRealOffset(30 - Math.ceil(Math.random()*15));
            AntiAim.SetLBYOffset(-15)
          }
          if(lby_jitter == 1)
          {
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(aa_static);
            AntiAim.SetRealOffset(50 - Math.ceil(Math.random()*15));
            AntiAim.SetLBYOffset(-15)
          }
        }
      }
      if(moving == 1)
      {
        if(slowwalk == 0)
        {
        if(lby_moving == 3)
        {
          lby_jitter++
          if(lby_jitter == 2)
          {
            lby_jitter = 0
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(aa_moving-15);
            AntiAim.SetRealOffset(30 - Math.ceil(Math.random()*15));
            AntiAim.SetLBYOffset(-15)
          }
          if(lby_jitter == 1)
          {
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(aa_moving);
            AntiAim.SetRealOffset(50 - Math.ceil(Math.random()*15));
            AntiAim.SetLBYOffset(-15)
          }
        }
        }
      }
      if(slowwalk == 1)
      {
        if(lby_slowwalk == 3)
        {
          lby_jitter++
          if(lby_jitter == 2)
          {
            lby_jitter = 0
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(aa_slowwalk-15);
            AntiAim.SetRealOffset(30 - Math.ceil(Math.random()*15));
            AntiAim.SetLBYOffset(-15)
          }
          if(lby_jitter == 1)
          {
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(aa_slowwalk);
            AntiAim.SetRealOffset(50 - Math.ceil(Math.random()*15));
            AntiAim.SetLBYOffset(-15)
          }
        }
      }
    }
  }
}





//假卡
var fl_enabled = 0
var min_fl = 0
var max_fl = 0
var fl_static = 0
var fl_moving = 0
var fl_slowwalk = 0
var fl_firing = 0
var fl_static2 = 0
var fl_moving2 = 0
var fl_slowwalk2 = 0
var fl_mode = 0
var fl_switch = 0
function Fake_lag()
{
  fl_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable fakelag')
  UI.SetValue('Anti-Aim', 'Fake-Lag', 'Enabled', fl_enabled)
  if(fl_enabled == 1)
  {
    fl_static = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum fake lag')
    fl_moving = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum fake lag ')
    fl_slowwalk = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum fake lag  ')
    fl_firing = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum fake lag   ')
    fl_static2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Maximum fake lag')
    fl_moving2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Maximum fake lag ')
    fl_slowwalk2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Maximum fake lag  ')

    fl_mode = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake lag mode')
    fl_switch++
    if(fl_switch > 1)
    {
      fl_switch = 0
    }
    if(rage_firing == 0 && firing == 0)
    {
    if(static == 1)
    {
      if(fl_mode == 0)
      {
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fl_static);
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fl_static2)
      }
      if(fl_mode == 1)
      {
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', Math['round'](Math['random']() * (fl_static2 - fl_static)) + fl_static);
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', Math['round'](Math['random']() * (fl_static2 - fl_static)) + fl_static)
      }
      if(fl_mode == 2)
      {
        if(fl_switch == 0)
        {
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fl_static);
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fl_static)
        }
        else {
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fl_static2);
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fl_static2)
        }
      }
    }

    if(moving == 1)
    {
      if(fl_mode == 0)
      {
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fl_moving);
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fl_moving2)
      }
      if(fl_mode == 1)
      {
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', Math['round'](Math['random']() * (fl_moving2 - fl_moving)) + fl_moving);
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', Math['round'](Math['random']() * (fl_moving2 - fl_moving)) + fl_moving)
      }
      if(fl_mode == 2)
      {
        if(fl_switch == 0)
        {
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fl_moving);
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fl_moving)
        }
        else {
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fl_moving2);
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fl_moving2)
        }
      }
    }

    if(slowwalk == 1)
    {
      if(fl_mode == 0)
      {
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fl_slowwalk);
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fl_slowwalk2)
      }
      if(fl_mode == 1)
      {
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', Math['round'](Math['random']() * (fl_slowwalk2 - fl_slowwalk)) + fl_slowwalk);
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', Math['round'](Math['random']() * (fl_slowwalk2 - fl_slowwalk)) + fl_slowwalk)
      }
      if(fl_mode == 2)
      {
        if(fl_switch == 0)
        {
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fl_slowwalk);
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fl_slowwalk)
        }
        else {
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fl_slowwalk2);
          UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fl_slowwalk2)
        }
      }
    }
  }

    if(firing == 1 || rage_firing == 1)
    {
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fl_firing);
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fl_firing)
    }
  }
}





var rage_firing = 0
//开枪假卡
function fakelag_onshot()
{
  rage_firing = 1
}





//绘画函数
function _0x70a4x107(x, y, _0x70a4xfc, _0x70a4xff, _0x70a4xb2) {
    var _0x70a4x101 = _0x70a4xfc - _0x70a4xff;
    for (; _0x70a4xfc > _0x70a4x101; --_0x70a4xfc) {
        Render.Circle(x, y, _0x70a4xfc, _0x70a4xb2)
    }
}

function _0x70a4x108(_0x70a4x109, _0x70a4x10a, _0x70a4xfa) {
    _0x70a4xfa = _0x70a4xfa / 180 * Math['PI'];
    var x = Math['cos'](_0x70a4xfa) * (_0x70a4x10a[0] - _0x70a4x109[0]) - Math['sin'](_0x70a4xfa) * (_0x70a4x10a[1] - _0x70a4x109[1]) + _0x70a4x109[0];
    var y = Math['sin'](_0x70a4xfa) * (_0x70a4x10a[0] - _0x70a4x109[0]) + Math['cos'](_0x70a4xfa) * (_0x70a4x10a[1] - _0x70a4x109[1]) + _0x70a4x109[1];
    return [x, y]
}

function draw_arc(x, y, radius, start_angle, percent, thickness, color) {
    var precision = (2 * Math.PI) / 75;
    var step = Math.PI / 180;
    var inner = radius - thickness;
    var end_angle = (start_angle + percent) * step;
    var start_angle = (start_angle * Math.PI) / 180;

    for (; radius > inner; --radius) {
        for (var angle = start_angle; angle < end_angle; angle += precision) {
            var cx = x + radius * Math.cos(angle);
            var cy = y + radius * Math.sin(angle);
            var cx2 = x + radius * Math.cos(angle + precision);
            var cy2 = y + radius * Math.sin(angle + precision);
            Render.Line(cx, cy, cx2, cy2, color);
            Render.Line(cx, cy, cx2, cy2, color);
            Render.Line(cx, cy, cx2, cy2, color);
        }
    }
}

function draw_circle(x, y, radius, thickness, color)

{

    var inner = radius - thickness;



    for(; radius > inner; --radius)

    {

        Render.Circle(x, y, radius, color);

    }

}

function adjust_angle(angle) {
    if (angle < 0) {
        angle = (90 + angle * (-1));
    } else if (angle > 0) {
        angle = (90 - angle);
    }
    return angle;
}





//AA其他
var dir = [0,0,0]
var speed = 0
var fake_indicator_mode = 0
var status_sl = 0
var speed_sl = 0
function AA()
{
if(slowwalk == 1)
{
  speed = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Slow walk speed');
  dir = [0,0,0]
  status_sl++
  speed_sl = 1.5 + Math['random']() * 0.5
  if(status_sl = 2)
  {
  if (Input.IsKeyPressed(0x57)) {
      dir[0] += speed * speed_sl
  };
  if (Input.IsKeyPressed(0x44)) {
      dir[1] += speed * 2.25 * speed_sl
  };
  if (Input.IsKeyPressed(0x41)) {
      dir[1] -= speed * 2.25 * speed_sl
  };
  if (Input.IsKeyPressed(0x53)) {
      dir[0] -= speed * speed_sl
  };
  status_sl = 0
  }
  else {
    if (Input.IsKeyPressed(0x57)) {
        dir[0] += speed / speed_sl
    };
    if (Input.IsKeyPressed(0x44)) {
        dir[1] += speed * 2.25 / speed_sl
    };
    if (Input.IsKeyPressed(0x41)) {
        dir[1] -= speed * 2.25 / speed_sl
    };
    if (Input.IsKeyPressed(0x53)) {
        dir[0] -= speed / speed_sl
    };
  }
  UserCMD.SetMovement(dir);
}
}





//AA指示器
var fake_indicator_mode = 0
var fake_color = [0,0,0]
var local_ang = 0
var fake_yaw = 0
var local = 0
var fake_ang = 0
function fake_indicator()
{
  if(alive == 1)
  {
    fake_indicator_mode = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake Arrow');
    fake_color = [visu_intslider[8],visu_intslider[9],visu_intslider[10],255]
    if(fake_indicator_mode == 1)
    {
local_ang = Local.GetViewAngles();
fake_yaw = Local.GetFakeYaw();
local = local_ang[1] - 180;
fake_ang = adjust_angle(fake_yaw - local);
draw_arc(screen_size[0] / 2, screen_size[1] / 2, 10, adjust_angle(360), 360, 5, [0, 0, 0, 50])
if(direction == 1)
{
  draw_arc(screen_size[0] / 2, screen_size[1] / 2, 10, adjust_angle(360), 180, 5, [fake_color[0], fake_color[1], fake_color[2], 255])
}
else {
  draw_arc(screen_size[0] / 2, screen_size[1] / 2, 10, adjust_angle(180), 180, 5, [fake_color[0], fake_color[1], fake_color[2], 255])
}
draw_arc(screen_size[0] / 2, screen_size[1] / 2, 18, fake_ang - (100 * 0.2), 45, 4, [fake_color[0], fake_color[1], fake_color[2], 255])
   }

   if(fake_indicator_mode == 2)
   {
     if(direction == 1)
     {
       Render.Polygon([
           [screen_size[0] / 2 - screen_size[0] / 2 * (65 / 960), screen_size[1] / 2],
           [screen_size[0] / 2 - screen_size[0] / 2 * (52 / 960), screen_size[1] / 2 - screen_size[1] / 2 * (10 / 540)],
           [screen_size[0] / 2 - screen_size[0] / 2 * (52 / 960), screen_size[1] / 2 + screen_size[1] / 2 * (10 / 540)]
       ], [fake_color[0], fake_color[1], fake_color[2], 255])
     }
     else {
       Render.Polygon([
           [screen_size[0] / 2 + screen_size[0] / 2 * (52 / 960), screen_size[1] / 2 - screen_size[1] / 2 * (10 / 540)],
           [screen_size[0] / 2 + screen_size[0] / 2 * (65 / 960), screen_size[1] / 2],
           [screen_size[0] / 2 + screen_size[0] / 2 * (52 / 960), screen_size[1] / 2 + screen_size[1] / 2 * (10 / 540)]
       ], [fake_color[0], fake_color[1], fake_color[2], 255])
     }
   }

   if(fake_indicator_mode == 3)
   {
     if(direction == 1)
     {
         font = Render.AddFont('Helvetica', 20, 700);
         Render.StringCustom(screen_size[0] / 2 - 52, screen_size[1] / 2 - 15, 1, '<', [fake_color[0], fake_color[1], fake_color[2], 255], font)
     }
     else {
         font = Render.AddFont('Helvetica', 20, 700);
         Render.StringCustom(screen_size[0] / 2 + 52, screen_size[1] / 2 - 15, 1, '>', [fake_color[0], fake_color[1], fake_color[2], 255], font)
     }
   }

   if(fake_indicator_mode == 4)
   {
     if(direction == 1)
     {
         font = Render.AddFont('Helvetica', 20, 700);
         Render.StringCustom(screen_size[0] / 2 - 52, screen_size[1] / 2 - 15, 1, '(', [fake_color[0], fake_color[1], fake_color[2], 255], font)
     }
     else {
         font = Render.AddFont('Helvetica', 20, 700);
         Render.StringCustom(screen_size[0] / 2 + 52, screen_size[1] / 2 - 15, 1, ')', [fake_color[0], fake_color[1], fake_color[2], 255], font)
     }
   }
 }
}





//侦查AA
var ragetarget = 0
var distance = [9999999999,9999999999,9999999999]
var distance2 = [9999999999,9999999999,9999999999]
var dist = 0
var db = 0
var lb = 0
var mindist = 0
var detect_aa = 0
var sl_break = 0
var nearest_target = 0
var detect_yaw = 0
var detect_jitter = 0
var e_peek = 0
var hra = 0
var ao = 0
var direc = 0
function Detect_AA()
{
  detect_aa = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Detect AA')
  sl_break = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Break Slow Walk')
  e_peek = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'E-peek')
  if(alive == 1)
  {
    if(hra == 1)
    {
      UI.SetValue('Anti-Aim', 'Fake angles', 'Hide real angle',0)
      hra = 0
    }
    if(ao == 1)
    {
      UI.SetValue('Anti-Aim', 'Fake angles', 'Avoid overlap',0)
      ao = 0
    }
  if(sl_break == 1 && slowwalk == 1)
  {
    detect_aa = 0
  }
  ragetarget = Entity.GetEnemies( )
  mindist = 0
  for (i=0; i < ragetarget.length; i++) {
    if(Entity.IsAlive(ragetarget[i]) == 1)
    {
    distance = Entity.GetRenderOrigin(Entity.GetLocalPlayer())
    distance2 = Entity.GetRenderOrigin(ragetarget[i])
  if(distance[0] > distance2[0])
  {
    db = distance[0] - distance2[0]
  }
  else {
    db = distance2[0] - distance[0]
  }
  if(distance[1] > distance2[1])
  {
    lb = distance[1] - distance2[1]
  }
  else {
    lb = distance2[1] - distance[1]
  }

  dist = Math.sqrt((db*db) + (lb*lb)) - 32
if(dist < mindist || mindist == 0)
{
  mindist = dist
  nearest_target = ragetarget[i]
  if(detect_aa == 1)
  {
    if((mindist/20) <= 50)
    {
  if(is_entity_visible( local_player, ragetarget[i], false ) == false)
  {
    if(moving == 1)
    {
    direc++
        if(direc == 1 || direc == 2)
        {
          AntiAim.SetOverride(1);
          AntiAim.SetFakeOffset(20);
          AntiAim.SetRealOffset(-60);
        }
        if(direc == 3)
        {
          AntiAim.SetOverride(1);
          AntiAim.SetFakeOffset(-30);
          AntiAim.SetRealOffset(60);
        }
        if(direc >= 4)
        {
          AntiAim.SetOverride(1);
          AntiAim.SetFakeOffset(-30);
          AntiAim.SetRealOffset(60);
          direc = 0
        }
        }
        else
        {
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset', -10);
          UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset',7);
          UI.SetValue('Anti-Aim', 'Fake angles', 'LBY mode',0);
        }
}
    if(is_entity_visible( local_player, ragetarget[i], false ) == true)
    {
    UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset', -10);
    UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset',7);
    UI.SetValue('Anti-Aim', 'Fake angles', 'LBY mode',0);
  }
    }
    if(e_peek == 1)
    {
      if(is_entity_visible( local_player, ragetarget[i], false ) == true)
      {
      UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset', 0);
      UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset',180);
      UI.SetValue('Anti-Aim', 'Fake angles', 'LBY mode',1);
      UI.SetValue('Anti-Aim', 'Extra', 'Pitch', 0);
      if(hra == 0)
      {
      if(UI.GetValue('Anti-Aim', 'Fake angles', 'Hide real angle') == 0)
      {
        UI.SetValue('Anti-Aim', 'Fake angles', 'Hide real angle',1)
        hra = 1
      }
      }
      if(ao == 0)
      {
      if(UI.GetValue('Anti-Aim', 'Fake angles', 'Avoid overlap') == 0)
      {
        UI.SetValue('Anti-Aim', 'Fake angles', 'Avoid overlap',1)
        ao = 1
      }
      }
      }
    }
   }
  }
}
}
}
}

function is_entity_visible( me, entity, extrapolate) {
    const extrapolate = function( entity, position ) {
        const velocity = Entity.GetProp( entity, "CBasePlayer", "m_vecVelocity[0]" );
        position[ 0 ] += velocity[ 0 ];
        position[ 1 ] += velocity[ 1 ];
        position[ 2 ] += velocity[ 2 ];
        return position;
    };
    const hitbox_positions = [  ];
    const hitboxes = [ 0, 3, 5, 11, 12, 13, 14 ];
    const origin = Entity.GetEyePosition( me );
    for ( var i = 0; i < hitboxes.length; i++ ) {
        const hitbox = hitboxes[ i ];
        hitbox_positions[ hitbox ] = Entity.GetHitboxPosition( entity, hitbox );
        const trace = Trace.Line( me, origin, hitbox_positions[ hitbox ] );
        if ( !trace )
            continue;
        if ( trace[1] > 0.95)
            return true;
    }
    if ( !extrapolate )
        return false;
    const extrapolate_hitboxes = [ 0, 3, 5 ];
    for ( var i = 0; i < extrapolate_hitboxes.length; i++ ) {
        const hitbox = extrapolate_hitboxes[ i ];
        const trace = Trace.Line( me, origin, extrapolate( entity, hitbox_positions[ hitbox ] ) );
        if ( !trace )
            continue;
        if ( trace[1] > 0.95)
            return true;
    }
    return false;
}

function get_rage_target(extrapolate) {
  var enemies = Entity.GetEnemies()
  const me = Entity.GetLocalPlayer()
  var rage_target = 0
  var mintrace = 10
  for(var e = 0;e < enemies.length; e++)
  {
    const extrapolate = function( entity, position ) {
        const velocity = Entity.GetProp( entity, "CBasePlayer", "m_vecVelocity[0]" );
        position[ 0 ] += velocity[ 0 ];
        position[ 1 ] += velocity[ 1 ];
        position[ 2 ] += velocity[ 2 ];
        return position;
    };
    if(Entity.IsAlive(enemies[e]))
    {
    const hitbox_positions = [  ];
    const hitboxes = [ 0, 3, 5, 11, 12, 13, 14 ];
    const origin = Entity.GetEyePosition( me );
        const hitbox = hitboxes[1];
        hitbox_positions = Entity.GetHitboxPosition( enemies[e], 3 );
        const trace = Trace.Line( me, origin, hitbox_positions );
    if(Math.round(trace[1] * 1000) < Math.round(mintrace * 1000))
    {
      mintrace = trace
      rage_target = enemies[e]
    }
    }
    }
    return rage_target
  }





//切换AA1
var switch_mode = 0
function switch_aa1()
{
  if(alive == 1)
  {
  if(Entity.GetEntityFromUserID(Event.GetInt("userid")) == local_player)
  {
    firing = 1
    firing_cs = 10
    firing2 = 1
    firing_cs2 = 150
  }
  if(Entity.IsEnemy(Entity.GetEntityFromUserID(Event.GetInt("userid"))) == 1)
  {
  enemy_firing = 1
  enemy_firing_cs = 20
  enemy_firing2 = 1
  enemy_firing_cs2 = 150
  }
  switch_mode = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Auto Switch')
  if(switch_mode == 2)
  {
  if(Entity.GetEntityFromUserID(Event.GetInt("userid")) == nearest_target)
  {
    UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter');
    UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', 0);
    UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', 0)
  }
  }
}
}





//切换AA2
function switch_aa2()
{
  if(alive == 1)
  {
  if(Entity.GetEntityFromUserID(Event.GetInt("userid")) == local_player)
  {
    if(switch_mode == 1)
      UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter');
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', 0);
      UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', 0)
  }
}
}





//杂项
var last_spam = 0
var spammerno = 0
var text = ''
var spammer_mode = 0
function misc()
{
  if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable spammer') == 1) {
      if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'spammer mode') == 0) {
          var text = ['是不是把你小时候你爸鸡.奸.你的心理阴影都打出来了？', '别再做狗了,加群买个OP翻身做人吧,让你爸妈在天之灵有个安慰', '就像你死去的亲妈血比被草烂了还生了你这么条苟,啧啧啧', '儿子咬你爹三百口,少一口对不起你死去的妈', '尼玛死的早没给你请老师也没钱给你治病让你智商这么低下只能卖比养活你这煞笔苟', '你野爹喝两盅你表.子妈血比泡的酒', '你爹我也是不言语一刀把你表.子奶尸体剁了吧你表.子妈卦起来换香肠', '死妈废.物,不会装比就别你.妈学你野爹们的口气,到头来就是把你表.子妈气的生下你这个杂.种怂比而难过', '难受就跪下给爹认个错？你爹我看在你表.子奶奶七八十岁的份上 给你这个弱.智一个面子 只杀你亲妈', '你爹我转身一记神罗天征把你表.子妈尸体吸到大爹手上 反手一拳打烂你表.子妈.的乳房', '废.物东西,爹不在给你逞威风？明天爹吊打你一天 杂.种玩意 现在跟你表.子妈去床上gangbang', '你爹我不会像你死去的表.子妈一样那么爱你,我得教你做人,教你怎么能草到你爱的那个表.子', '骂你了,你又跑了,然后又跟他.妈弱.智一样趁你爹有事就求你爹赐你一鸡巴吃 你表.子妈看到估计能气岔气', '哎呦,大年初五你.妈早上刚被大卡车扎死,下午你爸就开始打你奶的主意？怪不得会生出来你这个苟都不如的杂.种,快跪下来求你大爹我一刀砍下你的苟头', '你表.子妈也是扛起了波比2/3技能呢.你他.妈眼瞎？波比身上技能都有上你.妈.比？', '我也是在你表.子妈里安了个72寸大彩电播放你无状态爹越你表.子妈塔被你表.子妈反杀的视频', '我好像昨晚给您吗做了肢解黑木.耳手术是的呢,您吗是不是又被你爹移植的非洲大黑吊草的不要不要的了 您奶奶是不是又思念村头王光棍的大黑比伯了呢？', '也是强行忘了我昨晚给您吗比开光仪式上的恐惧了是吗？', '我请了孙悟空在您表.子妈.的血比里大闹了一场.现在你表.子妈正在愉快的成为花果比.', '是不是又强行忘了游戏爆炸把主机箱塞进你.妈.比时的窝囊废样子了呢？你五狼嚎风要干你爹我的时候被你爹我一个大耳巴子抽的你哭丧着脸叫爸爸时候的恐惧呢？', '为什么你总是忘记我双眼含泪看着你.妈吃这你爹的极薄时候销魂的眼神和表情了呢,为什么你.妈喜欢吃你爹的小牙签呢,是不是因为你爹昨晚被你奶奶夹的好像傻苟是的呢', '能不能别他.妈用您那二半吊子和尼玛了个比村口王师傅学的词汇攻击你爹我阿,你词汇量如此匮乏是你.妈夹到了你的头还是你天生是智障呢', '你奶奶祖上是潘金莲给你爹生成了武大郎是不是呢我给你表.子妈草的捂着比乱蹦是为什么呢,是不是恐惧你爹我的黑暗大吊呢', '我在你表.子妈身上漫游的时候不小心发现你表.子妈.的血比其实是个火山于是我请了挖掘机探索你表.子妈.的火山.', '我把你.妈.比给剖下来做成标本喂你爹吃,你爹吃了之后思念你奶奶比的味道,轻声问我这是什么,我说这是你童年时的青春,我就草了您表.子妈.的', '你为何如此窝囊废而你爹我是如此的仁慈在尽可能轻声的蹂躏你这个小杂碎呢,你是新中国的新产品杂交人是吗,是动物和人类最高的结合体嘛', '你表.子妈现在多少钱一晚,我想关顾他的生意,因为你.妈现在都不能为你洗衣做饭了,昨晚活生生被三五成群的大汉草的两眼翻白浑身抽搐', '我的小孙子,当你出生的时候整个中国都在呼喊你的名字,小杂碎！你应该感到骄傲,因为你的家庭一直都是以比和吊通知整个家族,你也应该相信你会继承这种光荣的传统,终有一天你爹的老烂子将会爆炸,而你将携吊称王！', '我前天开着飞机飞进了一个神秘地带出来后发现竟然是你表.子吗的无底洞.', '你也是强行忘记尼玛窝囊废时呵呵大笑蹦蹦跳跳被草的五狼嚎风哭哭啼啼的样子了,话说您当年也是被八国联军从您吗子宫活生生草出来的,所以说不到十个月你这智商基本我也能够理解,毕竟杂交人,心疼您吗', '我就是开心没事的时候和你.妈一起坐在草地上看着你奶奶在天上飞,我唱BOOM,您妈接SHAKALAKA ,完美,我和您吗不仅有身体上的契合还有精神上的默契,我和您吗就是中国的BIGBANG', '想当年您妈出水芙蓉刚长成,穿个小破皮袄子和我絮絮叨叨闯关东,二半道上被一棒子强行干晕,醒后发现腹痛,原是棒子国窝囊废叫驴选手做了好事不留名,后续被您吗养胎时被八国联军强行把你从子宫干出来.心疼您妈', '你.妈.的那个比有多大我觉得宇宙四海皆是你.妈.的家,你.妈.的比张开之后北冥有鱼都无法企及,唯有被囊入其中,你.妈.的比有多少水,如果非要说一下的话大概你家的人喝的自来水喝到你玄孙子的玄孙子都喝不完,你表.子妈能耐真大阿', '在山顶洞人时期我和你的表.子祖宗生出了你亲爹.后来你亲爹为了报答我对你亲爹的养育之恩把你表.子吗借我享用.', '后来进入大禹时期我把你表.子吗当作治水神器送给了大禹结果大禹表示你表.子吗并不喜欢于是送给了他的治水兄弟们轮奸.', '后来秦始皇修长城用你表.子吗的尸体烧成灰作为狼烟传递信.', '抗.曰时期你表.子吗为了给你亲爹一个全尸表示愿意给曰.本.鬼.子享用她的表.子尸体然后曰.本.鬼.子并不领情表示送给他的野苟.于是他的野苟强奸你表.子吗后撕裂了你表.子吗的肠子.', '你.妈当年在北大荒,当时缺水,你表.子妈大比一咧咧直接发大水,毕竟你表.子妈能耐量大,能喷会射,上能发水下能曰苟,晚上还能赚外快,还能开发票,毕竟买3送1草您妈.比', '我有天旅游发现有个水帘洞里面水流不止于是我进去探险发现里面居然出现红色的神奇水流后来地质学家告诉我这是你表.子吗的大血比.', '昨个对面盖高楼,您妈从30多层跳下来,让在底下给他杵着一根钢筋,不偏不倚正中您妈.比,给你.妈扎的透气,你.妈那叫的一个爽,四肢八叉在底下呻吟不已,完后建筑工人又从30多层给您妈扔下来一捆5000多公斤的钢筋,给你.妈.比一下扎的稀碎,你.妈爽的那叫一个抽出', '别看你表.子吗高贵冷艳只要我眉眼一抛你表.子吗必定给我大牛子服侍三天三夜.', '你.妈还嫌弃不够,我就拿着五档电风扇,旋转跳跃塞入你.妈.比,给你.妈.比绞肉机似的撕了个稀碎,给你.妈那五毛钱地摊上买的真丝内衣连着你.妈.的小黑毛一起绞成了肉酱给你爹包饺子吃', '我看你表.子吗的子宫被野苟戳穿于是我将你亲爹的尸体剁碎做成浆糊糊在你表.子吗的大血比瞬间变的完好无损.', '前几天你.妈心里不舒服,因为好久没有人草她了,好久没人敢摸你表.子妈.的黑比了,因为疑似有毒,于是就找了坦克车以每小时八十迈的速度把炮管刺入你.妈.比,猛力撞击之下连开数炮,把你表.子妈打的魂飞魄散', '你个苟杂.种死皮赖脸的添你态爹殊不知你态爹早已对你表.子吗不感兴趣.', '我在你表.子吗嘴里拉了屎看她气喘吁吁的样子就知道你亲妈吃的一定很爽.', '你奶奶那天上街被车装得飞出两米远,八米多高,草您妈乐死我了我活生生看着你奶奶没撞死摔死,艹伱妈屎尿齐流,摔的脑浆迸裂真尼玛了个比过瘾', '我在你亲妈.的血比里缝了一个定时炸弹只要你胡作非为你表.子吗必定死无葬身之地.', '你爷爷在家玩几把,玩着玩着几把断了,你奶奶回来用针线缝了之后发现还能用,于是嗷嗷往上坐,最后发现缝完之后你爷爷几把上的针没拿下来,完事两个人比合一,终于实现了梦的起点,永远的草在了一起,心疼你爷奶', '我把你表.子妈绑在车前面,把你爹扒光了绑墙上,几把用502绑起来开着车就撞上去,你.妈疯了似的大喊,孩他爹老娘来了,你爹享年12岁艹伱妈.的', '你亲妈被我开着装甲车碾压成一滩烂泥后竟然意外组成了一副精美无比的迷宫图.', '你好像从小就是窝囊废和智障的结合体为什么这么词汇量匮乏因为我没给你找学校上学,于是你就去隔壁王二蛋家偷看二蛋艹伱妈时的血腥场面是吗', '你也是忘了我当年撼地神牛一击电子催比手给你.妈.比锤的呼哈乱蹦,血花飞溅给你.妈.比锤的五狼嚎风,嘴里比比这我还要时的狼狈比样子了是吗', '我把你.妈吊起来草,给你.妈草的会旋转,给你.妈草黑比变成红肿比,把你爹的几把割下来为你.妈煲汤煮饭', '你好像是个傻比是的和我玩着这些无聊的词汇量匮乏的小窝囊废是的攻击你爹我的游戏呢阿？', '你他.妈.比窝囊废手速跟不上就好像死妈了一样和我絮絮叨叨说我复制阿,你能跟上你爹我的速度吗,草你表.子妈.的', '我当年使用了杨晓毅的十拳剑对你表.子吗疯狂输出但你表.子吗疯狂反抗于是我只能使用五毒拍比掌把你表.子吗的雪碧拍烂.', '我心疼你个废.物为什么这么窝囊废还要不自量力的攻击你爹我呢阿,你为什么这窝囊废,我是不是从小没给你教育好,早知如此何必当初我就应该把你.妈杀了艹伱妈生个这种废.物丢你老子我的人阿', '快爬起来擦擦眼泪跟上你爹我的这波节奏,别尼玛了个比瞬间爆炸被我恐惧支配的时候发现不能比比,好像被我一发Q沉默了嘴巴一样的不停抽自己耳巴子说自己是个废.物呢', '你.妈子宫肌瘤过多花重金邀请我去给她治疗于是我带着原子弹在你表.子吗的大血比引爆.', '你当年尼玛了个比,你当年是个窝囊废,你现在他.妈.比连窝囊废都不如你个苟篮子回家看看尼玛都在床上目瞪口呆嘴歪眼斜癌症晚期盆腔炎溃烂别比比了艹伱表.子妈.的', '月末丶未央: 回复 訫靖 :我也是心疼你这废.物错字连篇还和我强行比比尼玛了个比.尼玛为什么就生出你这种窝囊废选手难道是伱妈.比有毒,早年被草的太多生出了个 SD杂.种娃娃？哦不,哦脑,SB杂.种娃娃', '訫靖: 回复 月末丶未央 :可怜兮兮的苟杂.种来送亲妈不知悔改被我一记暴雨梨花针击穿大脑鲜红的苟血洒满你亲妈.的尸体.', '我心疼我的好儿子废.物麻烦你的手速跟上你爹我nice攻击你的手速好嘛？我草你.妈.的时候都没这么费劲好嘛？', '就这速度艹伱妈给你.妈扣比都不能让你.妈达到高.潮你还不明白你.妈为什么弃你不顾嘛？', '哪个犄角旮旯钻出来的孬种畜生也敢对你野爹的评论指指点点,你表.子妈性病晚期全身斑点到是被曰本天皇钦点到大曰本当万人骑的野种 上完你.妈还要喷一句什么烂比真你吗嗨臭', '野爹我最近心情大好可是来自内蒙古的败类竟敢在爸爸面前狺狺狂吠此时此刻我召唤内蒙古的大兄弟绑架了你表.子妈 围着你.妈举行神圣的篝火晚会 殊不知你这孝子还偷偷摸摸一颗雷塞到你.妈子宫深处 随着夜晚美丽的烟火 你.妈从此化为虚无', '社会底层的劣等人的卑微语言对野爹我.你.妈死了还不去瞧瞧,孽子,再不去叫黑人和农民工在你.妈.比上开尸体派对啦钢棍谢师傅把你.妈砸成肉酱了下等孬种你.妈.的死相还想再看一次？', '下等野种 贫乏的词语斗不过你爹我还企图用道德的制高点 殊不知你一家子的曰本户籍 并不配和我讲素质', '你这死妈废.物的表.子妈尸体被我扔进直布罗陀海峡后在地中海360度回旋式漂流最后在亚得里亚海销声匿迹', '不许开小差我开始讲重点了 拿笔出来记 1.你.妈是曰本慰安妇,天皇颁过奖的.2.你是社会最底层职校废.物 3.我不是你亲爹 你.妈是个荡妇 4.全家曰本户籍的人不配和我讲道理. 5.你全家今晚死无全尸 必须用浏阳花炮来庆祝.', '你这废.物现实中也是个满脸流油 1米5的半残疾人 吃着泡面美滋滋 扣扣鼻屎摸摸屁眼 在你野爹的集中营指点江山 你.妈卖b幸苦赚钱 你在这犯贱啊我草你.妈.的小骡子野种肏的', '喷苟真爽 看到你这社会底层的废.物 我就有作为人的高贵优越感 说简单点 你是苟 哦不 侮辱人类的伙伴了 你不是个东西 我想不到什么词语比你.妈.的存在更肮脏的了', '技能都不会念得废.物弱.智不影响我一个溜噶哇嘎嘚苦哦哭捞弄把你表.子妈亲手分尸 制作成美味无比的表.子妈黄焖鸡米饭你这不孝子吃得津津有味还问我有没有老干妈！？？', '嗨呀我草你.妈.的屌癌晚期的废.物祝你在太监的路上越走越好你表.子妈就交给非洲黑人当最下等性奴辣', '精神胜利法不能挽救你.妈开膛破肚的不争事实', '就这几把样子还大言不惭的和你爹我说喷你爹我阿,你好像死了表.子妈一样的自信呢是谁给你的自信呢我就艹你.妈了个比呢？', '你的手速在哪里呢阿我的好儿子阿,你的暴雨梨花针一下子扎在尼玛比里了嘛？找不到了嘛？', '你.妈被我化身新版慎开启q技能切下你表.子吗的大子宫.', '忘了我他.妈洞玄子三十六手为你.妈扣比算命,摸扎解梦了嘛？你好像表.子妈旋转起来不要命是的要我很里艹伱妈阿？', '你是不是这会气的两眼冒血死盯着手机屏幕熬熬乱叫阿,为什么呢因为你干不过你爹我阿,为什么你就这样放弃了呢,因为你表.子妈不争气阿,没给你生出一双好爪子阿草你表.子妈.的', '艹伱妈我突然想起了老版剑姬没改的大招,我真想2段Q冲进你.妈.比,直接开R给你.妈.比刺个对穿你知道吗我的好儿子,我爱你.妈爱得深沉', '我看你每天和你表.子吗乱伦作为一个正常人我勉为其难的答应了你亲爹的请求让你脱离苦海.于是我拿起武士刀对着你正在做爱的母亲一顿乱砍.', '不管什么时候不管将来我和你.妈多么生疏多么遥远伤的多么透彻,你要永远记住一句话务必帮我来转达,我最爱的人其实是你.妈', '你们家门前的小花似乎有点缺水于是我把你表.子吗摁在土壤里让你表.子吗尽情的用她的血液滋润小花.', '我看到了你我就想起了家门口那只大黄苟,它每天蹲在那里不吭不哈,一天到晚闷闷不乐,我想它大概每天最刺激的就是深夜里和你.妈.的激情69', '我拿着七龙珠对着你表.子吗的大血比续了一个愿望就是让你这个杂.种来世不要在出现在你表.子吗的子宫里.你表.子吗已经受尽折磨她不愿在放纵.', '但是时运不济一只苟完全承受不了你表.子妈.的摧残,于是大黄苟招蜂引蝶呼朋唤友叫来了一群苟兄弟,包括你,于是你就和你的苟兄弟们上阵父子兵,哦,对,还有你爹,毕竟一家老小全是苟,心疼我苟', '我在你表.子吗比里放了一个钻天猴于是你表.子吗愉快的飞上了天.', '你.妈.的比那叫一个酸爽,大老远闻着腥臭难闻,你爹那年闲着没事想吃酸菜给你.妈.比里扔了几十斤白菜,草您妈过了一天拉出来都他.妈.比赶上棒子的泡菜了,你表.子妈能耐真他.妈.比大', '我给你.妈绑到火箭上给你.妈送到外太空让外星人疯狂怒刚怼你.妈', '我使用太阳之箭对着你吗的下体射进去你.妈.比直接烧焦了散发出耀眼的火光.你吗的比弥漫着的焦炭的味道让人恶心你吗就像个烟囱.', '给你.妈怼完前门怼后门,强行干的你.妈螺旋式360度旋转,艹伱妈.的心疼你.妈花样多姿势怪,就是每天喜欢怼,服务地球服务宇宙', '我把您妈给怼到外星球的锅炉房里回炉改造给您吗怼哭在地,嗷嗷站起来掰着比唱小星星阿', '我把你奶奶的比刺啦撕开了把你.妈塞进去阿,和你.妈了个比手撕包菜一样的撕开了之后来盘回锅肉给你爹吃阿', '你大爹我看你表.子吗的比被人草的变黑不忍于是给了她五毛让你表.子吗去给她的大比做个美容于是你表.子吗带着五毛去大街上买了个塑料钻石镶在了你表.子吗的大比上以为能卖出更多钱.', '我把你爷爷吊起来艹伱妈扒光了给对面那群小母苟送福利阿,毕竟深夜福利我是老司机阿,带你开车带你飞阿,带你爷爷杵进母苟堆阿', '后来母苟就整天蹲你家门口阿,等着你爷爷出来嗷嗷叫阿,你爷爷之后看见苟都犯怵阿,比看见您奶奶都害怕为什么呢阿我求解阿,心疼你表.子妈.的', '看你这个曰本杂.种中文学的不错能打出人字来我决定奖励你表.子吗一个苟鸡巴给她解解馋.', '你姥姥骑自行车撞树一下磕到比了,当时嘴里唱着转角遇到爱,艹伱妈骑个自行车转角磕着比？', '废.物东西没词汇来开始瞎骂没伤害的让人感到可笑的小学生语言了？你可真是个废.物.', '我他.妈笑cry了艹伱妈.的,乐死我了,你看你那几把名字艹伱妈非主流表.子似的攻击你爹我中文不好阿,草你.妈.的了个比了,你是在你爹我面前强行修智商嘛？艹伱妈.的,我给你写个智商修订法案你看如何阿我的苟儿子', '我麻烦你看看你家书桌上和你.妈遗照并排放着的新华字典查查你爹我在说什么好嘛？', '你别用你那落后落伍几十年的网络小几把套词攻击你爹我了好嘛？你好想死了妈一样的在这重复着你嘴里的苟屎一样的词汇呢阿@', '我拿起m4往你表.子吗的臭比里射.洞穿无数.从里面爬出了你的兄弟姐妹无数各种卵虫.咬的你表.子吗高.潮迭起.就像进入了寂静岭.', '我是不是要艾特你.妈一波,看你.妈每天辛辛苦苦早出晚归含辛茹苦养出来的苟儿子在这每天和他多年不见来不及认祖归宗的野爹疯狂的战斗呢？', '就你这窝囊废的样子和脸上长个几把的相貌你还和我对话什么玩意阿,还不给你LPL韩国爹疯狂擦皮鞋去呢阿,带着你表.子妈,提供慰安服务阿,免费哦亲,有发票哦,记得好评哦亲,艹伱妈.的', '你也是忘了你.妈当年狐臭和腋毛成灾时候的辛酸史了,知道嘛？你.妈那狐臭草你.妈十里八村谁不知道', '看看你这个id你好像很自豪的说你是个弱.智？你爹我的id很正常.其实我开始想起你表.子吗的牌名但怕以后去草你亲妈.的人太多我没机会了于是算了.', '废.物能来词汇瞎骂有伤害吗？看你词穷的废.物样我真想把你拍回你表.子吗的大血比里回炉重造.', '我都心疼你的小手在光线昏暗的地下室里嘴里喘着粗气,胯下的牙签微微发颤,浑身冒着虚寒心里打着寒颤,不知道面对的是个什么样的爹,谜一样的男人,是吗？没错,我就是你20多年前的野爹,快来叫爸爸,虽然我', '你也不看看你那两眼血丝一脸蜡黄,一脸几把青春痘的比崽子,低下头拉开拉链看看牙签上的几根毛,你有什么资格和我絮絮叨叨的比比呢,为什么你不能好好的检讨自己,为什么不回去好好学习？艹伱妈.的为什么不和饶', '为什么你这废.物没有词汇来还在硬撑着想让你大爹我心疼你然后放过你这个弱.智吗？可以.不过需要你表.子吗来服侍我心服口服才行.', '我求求你了大兄弟,艹伱妈.的我为什么就没词汇了,什么叫没词汇了呢？FUCK YOU MOTHER ？', '我早就告诉过你,出门在外要有技术知道嘛,艹伱妈.的我让你和名师饶罗祥学截图你表.子妈横帮竖挡不让学？', '为什么你的词汇伤害变得不如之前那么让人心疼了？是不是脚本用完了阿？需要爸爸用你表.子吗的白带给你做碗汤给你长长词汇？', '我心疼你.妈了个死比的瞎比眼阿,你是不是艹伱妈草的视力低下营养不良了,我请你告诉我为什么我词汇不足,为什么你和我强行BB CARRY？', '这波强行词汇量不足是有什么依据呢我就艹伱妈了个比呢？我也是笑尿了', '为什么你这废.物开始使用低端语言开始向我耀武扬威了？难道抠比吧的弱.智才是你真正的表.子吗？', '我求你找出来那一段话里面我的段子是一样的,你.妈只有一个我艹伱妈.的姿势和方式永远是千变万化,不要试图模仿你爹我,因为姜还是老的辣你明白吗？', '我麻烦你告诉我,你.妈临死前告诫你的事情你都给我忘了嘛？你不知道你.妈说,曾经有一个谜一样的男人他是那样的可怕他是你的的亲野爹,见了他要绕着走吗？', '为什么不开始意淫模式而是瞎骂草你.妈了呢废.物?可惜你大爹我并不会理会你这个弱.智说出的弱.智词汇.', '难道你是已经接近半残废了嘛？难道你.妈现在在掐着你的脖子不让你BB CARYY了嘛？难道你.妈用比控制你一生的战略方针已经不好使了么嘛？', '是什么让你大大咧咧撑起了你这不足1立方微米的自信心大言不惭的攻击你无法无天法力无边的野爹呢？', '笑死我了,我要是没复制你.妈亲妈暴毙,全家活不过春节可好阿？我的好儿子阿@', '你看你好像死了吗一样的疯狂乱吠似的要干我但又心有余力不足似的模样拼命逗我发笑呢？'];
          if (Global.Tickcount() - last_spam > 56) {
              Global.ExecuteCommand('say ' + text[spammerno]);
              last_spam = Global.Tickcount();
              spammerno++;
              if (spammerno > 51) {
                  spammerno = 1
              }
          }
      };
      if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'spammer mode') == 1) {
          var text = ['You play basketball like caixukun', 'What a bird man!', 'I wish I had never met you.', 'It’s none of your business.', 'He has a foul mouth. He would just as soon curse you as look at you.', 'Get the fucking my way!', 'The fucking mofo,Iwant to kill you!Cocksucker!', 'Hey! wise up! ', 'What the fuck are you talking about?', 'This is such a bitchery.', 'Stop bitching on my dick!', 'You’re son of bitch! ', 'You are out of your mind. ', 'You have a lot of nerve.', 'You’re just a good for nothing bum! ', 'Fuck you the fucking fucker！', 'Don t give me your attitude.', 'You’re a bloody genius! ', 'Cut it out.', 'Its none of your business. ', 'You big shit!', 'Get away from me! ', 'Get off my back. ', 'You heartless bastard! ', 'Don’t push me! ', 'Forced to like you a two', 'Your brain damage ah', 'Negative score ,get away！', 'Stop screwing/ fooling/ messing around!', 'I detest you! ', 'You are fucking genius', 'Bull shit', 'you are son of a bitch', 'You deserve fucking this', 'Are you shitting/kidding me？', 'Go to hellGo to hell', 'What the fuck/hell ', 'You look like ashit ', 'don’t fuck with me', 'who the hell are you! ', 'forget about it ', 'what’s your fucking problem', 'Fuck ya', 'get fuck off', 'So what？', 'Pure idiot', 'It is a scum', 'And the dog is a', 'Negative IQ imbecile', 'Bear force not arrogant', 'Bitch is fucking shame on you', 'Simon didn t you demon', 'The eunuch trait you all', 'Give me this set', 'Flower dog circles', 'Stupid moron', 'You horrid scumbag', 'The base prize for you', 'The cerebellum developed, not brain', 'Bastard you see all stunned', 'Bloated coquettish woman', 'Bitch not Bitchy, is bullshit.', 'Idiotic to myrrh medicine', 'No matter how you look at it, you are like a pig.', 'Garbage trash talking', 'Local tyrant can t tall, rich and handsome', 'Son of a bitch is not good', 'Heart very dirty', 'The ugly not fit to be seen', 'Birdlike, not arrogant', 'Ignorance of wretched asshole', 'Mind full of feces', 'Psychiatric patients with severe', 'Stop fooling around!', 'Unable to compliment your IQ', 'Scumbag representative', 'Can t stand you pretend', 'The typical animal', 'Only the Bitch prostitution', 'The dog paralysis', 'Monster from outer space', 'Stink Fox, get away as far as you can', 'Don t Bitchy lousy bitch', 'Roll back home to play cucumber', 'The evil scumbag', 'A normal person', 'Nobody wants little bastard', 'Bitch character is low', 'Explosion you Chrysanthemum', 'Mind filled with sand', 'You play basketball like caixukun', 'What a bird man!', 'I wish I had never met you.', 'It’s none of your business.', 'He has a foul mouth. He would just as soon curse you as look at you.', 'Get the fucking my way!', 'The fucking mofo,Iwant to kill you!Cocksucker!', 'Hey! wise up! ', 'What the fuck are you talking about?', 'This is such a bitchery.', 'Stop bitching on my dick!', 'You’re son of bitch! ', 'You are out of your mind. ', 'You have a lot of nerve.', 'You’re just a good for nothing bum! ', 'Fuck you the fucking fucker！', 'Don t give me your attitude.', 'You’re a bloody genius! ', 'Cut it out.', 'Its none of your business. ', 'You big shit!', 'Get away from me! ', 'Get off my back. ', 'You heartless bastard! ', 'Don’t push me! ', 'Forced to like you a two', 'Your brain damage ah', 'Negative score ,get away！', 'Stop screwing/ fooling/ messing around!', 'I detest you! ', 'You are fucking genius', 'Bull shit', 'you are son of a bitch', 'You deserve fucking this', 'Are you shitting/kidding me？', 'Go to hellGo to hell', 'What the fuck/hell ', 'You look like ashit ', 'don’t fuck with me', 'who the hell are you! ', 'forget about it ', 'what’s your fucking problem', 'Fuck ya', 'get fuck off', 'So what？', 'Pure idiot', 'It is a scum', 'And the dog is a', 'Negative IQ imbecile', 'Bear force not arrogant', 'Bitch is fucking shame on you', 'Simon didn t you demon', 'The eunuch trait you all', 'Give me this set', 'Flower dog circles', 'Stupid moron', 'You horrid scumbag', 'The base prize for you', 'The cerebellum developed, not brain', 'Bastard you see all stunned', 'Bloated coquettish woman', 'Bitch not Bitchy, is bullshit.', 'Idiotic to myrrh medicine', 'No matter how you look at it, you are like a pig.', 'Garbage trash talking', 'Local tyrant can t tall, rich and handsome', 'Son of a bitch is not good', 'Heart very dirty', 'The ugly not fit to be seen', 'Birdlike, not arrogant', 'Ignorance of wretched asshole', 'Mind full of feces', 'Psychiatric patients with severe', 'Stop fooling around!', 'Unable to compliment your IQ', 'Scumbag representative', 'Can t stand you pretend', 'The typical animal', 'Only the Bitch prostitution', 'The dog paralysis', 'Monster from outer space', 'Stink Fox, get away as far as you can', 'Don t Bitchy lousy bitch', 'Roll back home to play cucumber', 'The evil scumbag', 'A normal person', 'Nobody wants little bastard', 'Bitch character is low', 'Explosion you Chrysanthemum', 'Mind filled with sand', 'You play basketball like caixukun', 'What a bird man!', 'I wish I had never met you.', 'It’s none of your business.', 'He has a foul mouth. He would just as soon curse you as look at you.', 'Get the fucking my way!', 'The fucking mofo,Iwant to kill you!Cocksucker!', 'Hey! wise up! ', 'What the fuck are you talking about?', 'This is such a bitchery.', 'Stop bitching on my dick!', 'You’re son of bitch! ', 'You are out of your mind. ', 'You have a lot of nerve.', 'You’re just a good for nothing bum! ', 'Fuck you the fucking fucker！', 'Don t give me your attitude.', 'You’re a bloody genius! ', 'Cut it out.', 'Its none of your business. ', 'You big shit!', 'Get away from me! ', 'Get off my back. ', 'You heartless bastard! ', 'Don’t push me! ', 'Forced to like you a two', 'Your brain damage ah', 'Negative score ,get away！', 'Stop screwing/ fooling/ messing around!', 'I detest you! ', 'You are fucking genius', 'Bull shit', 'you are son of a bitch', 'You deserve fucking this', 'Are you shitting/kidding me？', 'Go to hellGo to hell', 'What the fuck/hell ', 'You look like ashit ', 'don’t fuck with me', 'who the hell are you! ', 'forget about it ', 'what’s your fucking problem', 'Fuck ya', 'get fuck off', 'So what？', 'Pure idiot', 'It is a scum', 'And the dog is a', 'Negative IQ imbecile', 'Bear force not arrogant', 'Bitch is fucking shame on you', 'Simon didn t you demon', 'The eunuch trait you all', 'Give me this set', 'Flower dog circles', 'Stupid moron', 'You horrid scumbag', 'The base prize for you', 'The cerebellum developed, not brain', 'Bastard you see all stunned', 'Bloated coquettish woman', 'Bitch not Bitchy, is bullshit.', 'Idiotic to myrrh medicine', 'No matter how you look at it, you are like a pig.', 'Garbage trash talking', 'Local tyrant can t tall, rich and handsome', 'Son of a bitch is not good', 'Heart very dirty', 'The ugly not fit to be seen', 'Birdlike, not arrogant', 'Ignorance of wretched asshole', 'Mind full of feces', 'Psychiatric patients with severe', 'Stop fooling around!', 'Unable to compliment your IQ', 'Scumbag representative', 'Can t stand you pretend', 'The typical animal', 'Only the Bitch prostitution', 'The dog paralysis', 'Monster from outer space', 'Stink Fox, get away as far as you can', 'Don t Bitchy lousy bitch', 'Roll back home to play cucumber', 'The evil scumbag', 'A normal person', 'Nobody wants little bastard', 'Bitch character is low', 'Explosion you Chrysanthemum', 'Mind filled with sand', 'You play basketball like caixukun', 'What a bird man!', 'I wish I had never met you.', 'It’s none of your business.', 'He has a foul mouth. He would just as soon curse you as look at you.', 'Get the fucking my way!', 'The fucking mofo,Iwant to kill you!Cocksucker!', 'Hey! wise up! ', 'What the fuck are you talking about?', 'This is such a bitchery.', 'Stop bitching on my dick!', 'You’re son of bitch! ', 'You are out of your mind. ', 'You have a lot of nerve.', 'You’re just a good for nothing bum! ', 'Fuck you the fucking fucker！', 'Don t give me your attitude.', 'You’re a bloody genius! ', 'Cut it out.', 'Its none of your business. ', 'You big shit!', 'Get away from me! ', 'Get off my back. ', 'You heartless bastard! ', 'Don’t push me! ', 'Forced to like you a two', 'Your brain damage ah', 'Negative score ,get away！', 'Stop screwing/ fooling/ messing around!', 'I detest you! ', 'You are fucking genius', 'Bull shit', 'you are son of a bitch', 'You deserve fucking this', 'Are you shitting/kidding me？', 'Go to hellGo to hell', 'What the fuck/hell ', 'You look like ashit ', 'don’t fuck with me', 'who the hell are you! ', 'forget about it ', 'what’s your fucking problem', 'Fuck ya', 'get fuck off', 'So what？', 'Pure idiot', 'It is a scum', 'And the dog is a', 'Negative IQ imbecile', 'Bear force not arrogant', 'Bitch is fucking shame on you', 'Simon didn t you demon', 'The eunuch trait you all', 'Give me this set', 'Flower dog circles', 'Stupid moron', 'You horrid scumbag', 'The base prize for you', 'The cerebellum developed, not brain', 'Bastard you see all stunned', 'Bloated coquettish woman', 'Bitch not Bitchy, is bullshit.', 'Idiotic to myrrh medicine', 'No matter how you look at it, you are like a pig.', 'Garbage trash talking', 'Local tyrant can t tall, rich and handsome', 'Son of a bitch is not good', 'Heart very dirty', 'The ugly not fit to be seen', 'Birdlike, not arrogant', 'Ignorance of wretched asshole', 'Mind full of feces', 'Psychiatric patients with severe', 'Stop fooling around!', 'Unable to compliment your IQ', 'Scumbag representative', 'Can t stand you pretend', 'The typical animal', 'Only the Bitch prostitution', 'The dog paralysis', 'Monster from outer space', 'Stink Fox, get away as far as you can', 'Don t Bitchy lousy bitch', 'Roll back home to play cucumber', 'The evil scumbag', 'A normal person', 'Nobody wants little bastard', 'Bitch character is low', 'Explosion you Chrysanthemum', 'Mind filled with sand', 'You play basketball like caixukun', 'What a bird man!', 'I wish I had never met you.', 'It’s none of your business.', 'He has a foul mouth. He would just as soon curse you as look at you.', 'Get the fucking my way!', 'The fucking mofo,Iwant to kill you!Cocksucker!', 'Hey! wise up! ', 'What the fuck are you talking about?', 'This is such a bitchery.', 'Stop bitching on my dick!', 'You’re son of bitch! ', 'You are out of your mind. ', 'You have a lot of nerve.', 'You’re just a good for nothing bum! ', 'Fuck you the fucking fucker！', 'Don t give me your attitude.', 'You’re a bloody genius! ', 'Cut it out.', 'Its none of your business. ', 'You big shit!', 'Get away from me! ', 'Get off my back. ', 'You heartless bastard! ', 'Don’t push me! ', 'Forced to like you a two', 'Your brain damage ah', 'Negative score ,get away！', 'Stop screwing/ fooling/ messing around!', 'I detest you! ', 'You are fucking genius', 'Bull shit', 'you are son of a bitch', 'You deserve fucking this', 'Are you shitting/kidding me？', 'Go to hellGo to hell', 'What the fuck/hell ', 'You look like ashit ', 'don’t fuck with me', 'who the hell are you! ', 'forget about it ', 'what’s your fucking problem', 'Fuck ya', 'get fuck off', 'So what？', 'Pure idiot', 'It is a scum', 'And the dog is a', 'Negative IQ imbecile', 'Bear force not arrogant', 'Bitch is fucking shame on you', 'Simon didn t you demon', 'The eunuch trait you all', 'Give me this set', 'Flower dog circles', 'Stupid moron', 'You horrid scumbag', 'The base prize for you', 'The cerebellum developed, not brain', 'Bastard you see all stunned', 'Bloated coquettish woman', 'Bitch not Bitchy, is bullshit.', 'Idiotic to myrrh medicine', 'No matter how you look at it, you are like a pig.', 'Garbage trash talking', 'Local tyrant can t tall, rich and handsome', 'Son of a bitch is not good', 'Heart very dirty', 'The ugly not fit to be seen', 'Birdlike, not arrogant', 'Ignorance of wretched asshole', 'Mind full of feces', 'Psychiatric patients with severe', 'Stop fooling around!', 'Unable to compliment your IQ', 'Scumbag representative', 'Can t stand you pretend', 'The typical animal', 'Only the Bitch prostitution', 'The dog paralysis', 'Monster from outer space', 'Stink Fox, get away as far as you can', 'Don t Bitchy lousy bitch', 'Roll back home to play cucumber', 'The evil scumbag', 'A normal person', 'Nobody wants little bastard', 'Bitch character is low', 'Explosion you Chrysanthemum', 'Mind filled with sand'];
          if (Global.Tickcount() - last_spam > 56) {
              Global.ExecuteCommand('say ' + text[spammerno]);
              last_spam = Global.Tickcount();
              spammerno++;
              if (spammerno > 66) {
                  spammerno = 1
              }
          }
      };
      if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'spammer mode') == 2) {
          var text = ['Что вы думаете, что вы? Вы просто умственно отсталый', 'Вы действительно думаете, что можете выпить всем после выпивки водки?', 'Вы должны знать, что вы дурак только с водкой', 'Кроме водки, что еще ты делаешь?', 'Заниматься сексом со своей сукой дома?', 'Или изнасиловать некрасивую женщину на улице?', 'Думают ли россияне, что могут победить медведя?', 'Это чертовски большая шутка', 'Ты выглядишь ужасно', 'Даже медведи презирают тебя', 'Вы идете домой и пьете водку', 'Не теряйте лицо здесь', 'Если ты так плохо играешь, во что еще ты играешь?', 'Разве не было бы хорошо пойти домой, чтобы пахать поля и разводить овец?', 'Вы действительно думаете, что вы великий лысый человек?'];
          if (Global.Tickcount() - last_spam > 56) {
              Global.ExecuteCommand('say ' + text[spammerno]);
              last_spam = Global.Tickcount();
              spammerno++;
              if (spammerno > 14) {
                  spammerno = 1
              }
          }
      };
      if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'spammer mode') == 3) {
          var _0x70a4x122 = ['﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽ ﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽ ﷽﷽ ﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽ ﷽﷽ ﷽﷽﷽ ﷽﷽', '﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽ ﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽ ﷽﷽ ﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽ ﷽﷽ ﷽﷽﷽ ﷽﷽', '﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽ ﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽ ﷽﷽ ﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽ ﷽﷽ ﷽﷽﷽ ﷽﷽'];
          if (Global.Tickcount() - last_spam > 56) {
              Global.ExecuteCommand('say ' + _0x70a4x122[spammerno]);
              last_spam = Global.Tickcount();
              spammerno++;
              if (spammerno > 2) {
                  spammerno = 1
              }
          }
      }
  }
  Entity.SetProp(Entity.GetLocalPlayer(), 'CCSPlayerResource', 'm_nMusicID', UI.GetValue('music kits'))
  if(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'fake rank') == 1)
  {
  Entity.SetProp( Entity.GetLocalPlayer(), 'CCSPlayerResource', 'm_iCompetitiveRanking', 18)
  }
}





//视觉
var watermark = 0
var box_fill = 0
var rainbowbar_enabled = 0
var box_color = [0,0,0]
var date = 0
var date_hour = 0
var date_minute = 0
var date_second = 0
var tickrate = 0
var watermark_color = 0
var watermark_rainbow = 0
var scopebar_enable = 0
var fake_indicator_enable = 0
var fake_indicator_color = [0,0,0,0]
var fake_indicatorX = 20
var fake_indicatorY = screen_size[1]/2 + 100
var r = 255
var b = 0
var g = 0
var r1 = 0
var b1 = 0
var g1 = 1
var scopebar_color = [0,0,0,0]
var sizeX = 150;
var sizeY = 1;
var startX = screen_size[0] / 2 + 1
var startY = screen_size[1] / 2 + 1
var off = sizeX /2+20;
var aspectratio = 0
var datacs = 2
var status = 'static'
var datadesync = UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset')
var datadesync2 = UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset')
var datajitter = UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset')
var datajitter2 = UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset')
var datafl1 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum fakelag')
var datafl2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Maximum fakelag')
var datafakelagmin = UI.GetValue('Anti-Aim', 'Fake-Lag', 'Limit')
var datafakelagmax = UI.GetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit')
var datadir = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw base')
var rage_indicatorX = screen_size[0] - 120
var rage_indicatorY = screen_size[1]/2 - 100
var fake_indicatorX1 = 0
var fake_indicatorY1 = 0
var can_move = 0
var rage_indicator_enable = 0
var rage_indicatorX1 = 0
var rage_indicatorY1 = 0
var rage_indicator_color = [0,0,0,0]
var can_move1 = 0
var tc_cs = 0
var indicator_enable = 0
if(datadir == 0)
{
  datadir = 'local view'
}
else {
  datadir = 'At target'
}
function visuals()
{
  watermark = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable watermark")
  watermark_rainbow = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Rainbow watermark")
  box_fill = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Fullfilled box")
  rainbowbar_enabled = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable rainbow bar")
  scopebar_enable = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable scope bar")
  fake_indicator_enable = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable fake indicator")
  rage_indicator_enable = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable rage indicator")
  indicator_enable = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable indicator")
  if(aspectratio * 10 != UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Aspect ratio'))
  {
  aspectratio = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Aspect ratio')/ 10
  Convar.SetString("r_aspectratio", aspectratio.toString())
  }

  var props = false;
  var tonemapClass = 'CEnvTonemapController';
  var entities = Entity.GetEntities();

  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    var name = Entity.GetClassName(entity);

    if (name !== tonemapClass) {
      continue;
    }

    if (!props) {
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomAutoExposureMin', true);
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomAutoExposureMax', true);
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomBloomScale', true);

      props = true;
    }

    if (props) {
      var value = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'World exposure') / 10;
      Entity.SetProp(entity, tonemapClass, 'm_flCustomAutoExposureMin', value);
      Entity.SetProp(entity, tonemapClass, 'm_flCustomAutoExposureMax', value);

      Entity.SetProp(entity, tonemapClass, 'm_flCustomBloomScale', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Bloom scale') / 10);
    }
    Convar.SetFloat('r_modelAmbientMin', UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Model ambient') / 10);
  }
  UI.SetValue('Misc','PERFORMANCE&INFORMATION','Performance','Disable post processing',0)
  if(watermark == 1)
  {
    UI.SetValue('Misc','PERFORMANCE&INFORMATION','Information','Watermark',0)
    const ip = World.GetServerString();
    const delay = Math['floor'](Global.Latency() * 1000 / 1.5) + 'ms';
    date_hour = date['getHours']();
    date_minute = date['getMinutes']();
    date_second = date['getSeconds']();
    if (date_hour <= 9) {
        hours = '0' + date['getHours']() + ':'
    } else {
        hours = date_hour + ':'
    };
    if (date_minute <= 9) {
        minutes = '0' + date['getMinutes']() + ':'
    } else {
        minutes = date_minute + ':'
    };
    if (date_second <= 9) {
        seconds = '0' + date['getSeconds']()
    } else {
        seconds = date_second
    };
    time = hours + minutes + seconds;
    tickrate = Global.Tickrate();
    if (ip == 0) {
        watermark_color = [visu_intslider[5],visu_intslider[6],visu_intslider[7],255]
        for(var i = 0;i<21;i++)
        {
        Render.Line(screen_size[0] - 200 - i,20 - i,screen_size[0] - 200 - i,-1,[0, 0, 0, 150])
        }
        for(var i = 0;i<200;i++)
        {
        Render.Line(screen_size[0] - i,-1,screen_size[0] - i,20,[0, 0, 0, 150])
        }
        if(watermark_rainbow == 0)
        {
          Render.Line(screen_size[0] - 200,20,screen_size[0],20,[watermark_color[0], watermark_color[1], watermark_color[2], 255]);
          Render.Line(screen_size[0] - 220,0,screen_size[0] - 200,20,[watermark_color[0], watermark_color[1], watermark_color[2], 255]);
        }
        else {
          Render.Line(screen_size[0] - 200,20,screen_size[0],20,[r, g, b, 255]);
          Render.Line(screen_size[0] - 220,0,screen_size[0] - 320,20,[r, g, b, 255]);
        }
        var font = Render.AddFont('Helvetica', 8, 600);
        Render.StringCustom(screen_size[0] - 100, 3, 1, 'VioLet [Beta] | user | ' + time, [255, 255, 255, 255], font)
    };
    if (ip != 0) {
        watermark_color = [visu_intslider[5],visu_intslider[6],visu_intslider[7],255]
        for(var i = 0;i<21;i++)
        {
        Render.Line(screen_size[0] - 320 - i,20 - i,screen_size[0] - 320 - i,-1,[0, 0, 0, 150])
        }
        for(var i = 0;i<320;i++)
        {
        Render.Line(screen_size[0] - i,-1,screen_size[0] - i,20,[0, 0, 0, 150])
        }
        if(watermark_rainbow == 0)
        {
          Render.Line(screen_size[0] - 320,20,screen_size[0],20,[watermark_color[0], watermark_color[1], watermark_color[2], 255]);
          Render.Line(screen_size[0] - 340,0,screen_size[0] - 320,20,[watermark_color[0], watermark_color[1], watermark_color[2], 255]);
        }
        else {
          Render.Line(screen_size[0] - 320,20,screen_size[0],20,[r, g, b, 255]);
          Render.Line(screen_size[0] - 340,0,screen_size[0] - 320,20,[r, g, b, 255]);
        }
        var font = Render.AddFont('Helvetica', 8, 600);
        Render.StringCustom(screen_size[0] - 160, 3, 1, 'VioLet [BETA] | user | delay: ' + delay + " | " + tickrate + " tick | " + time, [255, 255, 255, 255], font)
      }
  }

  if(box_fill == 1)
  {
    box_color = [visu_intslider[11],visu_intslider[12],visu_intslider[13],visu_intslider[14]]
    players = Entity.GetPlayers()
    for (i = 0; i < players.length; i++)
    {
        if (Entity.IsEnemy(players[i]) && Entity.IsAlive(players[i]) && !Entity.IsDormant(players[i]))
        {
            bounds = Entity.GetRenderBox(players[i])
            if (bounds[0] == 1)
            {
                Render.GradientRect(bounds[1], bounds[2], bounds[3]-bounds[1], bounds[4]-bounds[2],  0, [ box_color[0], box_color[1], box_color[2], box_color[3] ], [ box_color[0], box_color[1], box_color[2], 255 ] )
            }
        }
    }
}

  if(scopebar_enable == 1)
  {
    fh_color = [visu_intslider[15],visu_intslider[16],visu_intslider[17],255]
     if (Entity.GetProp(local_player, "CCSPlayer", "m_bIsScoped")) {
       if(alive ==1)
       {
       rect(startX - off, startY, sizeX, sizeY, 1, [fh_color[0],fh_color[1], fh_color[2], 0], [255, 255, 255, 255]);
       rect(startX + off, startY, sizeX, sizeY, 1, [255, 255, 255, 255], [fh_color[0],fh_color[1], fh_color[2], 0]);
       rect(startX, startY - off, sizeY, sizeX, 0, [fh_color[0],fh_color[1], fh_color[2], 0], [255, 255, 255, 255]);
       rect(startX, startY + off, sizeY, sizeX, 0, [255, 255, 255, 255], [fh_color[0],fh_color[1], fh_color[2], 0]);
  }
}
  }

if(r >= 0 && b == 0)
{
  if(g1 == 1)
  {
    r = r - 1
    g = g + 1
    if(r == 0)
    {
      g1 = 0
      b1 = 1
    }
  }
}

if(r == 0 && g >= 0)
{
  if(b1 == 1)
  {
    g = g - 1
    b = b + 1
    if(g == 1)
    {
      bl = 0
      r1 = 1
    }
  }
}

if(g == 0 && r >= 0)
{
  if(r1 == 1)
  {
    b = b - 1
    r = r + 1
    if(r == 255)
    {
      r1 = 0
      g1 = 1
    }
  }
}
      if(rainbowbar_enabled == 1)
      {
      Render.FilledRect(0, 0, screen_size[0], 3,[r, g, b, 255])
      Render.FilledRect(0, 0, 3, screen_size[1],[r, g, b, 255])
      Render.FilledRect(screen_size[0] - 3, 0, 3, screen_size[1],[r, g, b, 255])
      Render.FilledRect(0, screen_size[1] - 3, screen_size[0], 3,[r, g, b, 255])
    }
    if(fake_indicator_enable == 1)
    {
      if(datacs != 0)
      {
        datacs = datacs - 1
      }
      else {
        datacs = 15
        datadesync = UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset')
        datadesync2 = UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset')
        datajitter = UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset')
        datajitter2 = UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset')
        if(datadesync2 < 0)
        {
          datadesync2 = -1 * datadesync2
        }
        if(datajitter2 < 0)
        {
          datajitter2 = -1 * datajitter2
        }
        if(static == 1)
        {
        datafl1 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum fake lag')
        datafl2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Maximum fake lag')
        status = 'static'
        }
        if(moving == 1)
        {
        datafl1 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum fake lag ')
        datafl2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Maximum fake lag ')
        status = 'moving'
        }
        if(slowwalk == 1)
        {
        datafl1 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Minimum fake lag  ')
        datafl2 = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Maximum fake lag  ')
        status = 'slow walking'
        }
        fakelag_mode = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Fake lag mode')
        if(fakelag_mode == 0)
        {
          fakelag_mode = 'static'
        }
        if(fakelag_mode == 1)
        {
          fakelag_mode = 'random'
        }
        if(fakelag_mode == 2)
        {
          fakelag_mode = 'switch'
        }
        datafakelagmin = UI.GetValue('Anti-Aim', 'Fake-Lag', 'Limit')
        datafakelagmax = UI.GetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit')
        datadir = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Yaw base')
        if(datadir == 0)
        {
          datadir = 'local view'
        }
        else {
          datadir = 'At target'
        }
      }
      if(alive == 1 || menu_open == 1)
      {
      if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
          x: fake_indicatorX,
          y: fake_indicatorY
      }, {
        x: fake_indicatorX + 255,
        y: fake_indicatorY + 97
      })) {
        fake_indicatorX1 = mouse_pos()['x'] - fake_indicatorX
        fake_indicatorY1 = mouse_pos()['y'] - fake_indicatorY
        can_move = 1
        key_down(0x1)
      }

      if(key_released(0x1) == 1)
      {
        fake_indicatorX1 = mouse_pos()['x']
        fake_indicatorY1 = mouse_pos()['y']
        can_move = 0
      }

      if(can_move == 1)
      {
        fake_indicatorX = mouse_pos()['x'] - fake_indicatorX1
        fake_indicatorY = mouse_pos()['y'] - fake_indicatorY1
      }
      fake_indicator_color1 = [visu_intslider[18],visu_intslider[19],visu_intslider[20],255]
      fake_indicator_color2 = [visu_intslider[21],visu_intslider[22],visu_intslider[23],255]
      var _0x70a4xd2 = Render.AddFont('Helvetica', 9, 700);
      Render.GradientRect(fake_indicatorX, fake_indicatorY + 3, 3, 43, 1, [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 200], [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 175]);
      Render.GradientRect(fake_indicatorX, fake_indicatorY, datafakelagmin / 16 * 175 + 40, 3, 1, [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 200], [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 0]);
      Render.GradientRect(fake_indicatorX, fake_indicatorY + 45, datafakelagmax / 16 * 175 + 40, 3, 1, [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 200], [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 0]);
      Render.GradientRect(fake_indicatorX+3, fake_indicatorY+5, 250, 40, 1, [0, 0, 0, 200], [0, 0, 0, 0]);
      Render.GradientRect(fake_indicatorX+3, fake_indicatorY+23, ((datafakelagmin / 16 * 175) +  (datafakelagmax / 16 * 175))/2, 2, 1, [0, 0, 0, 0], [255, 255, 255, 255]);
      Render.StringCustom(fake_indicatorX + 10, fake_indicatorY + 5, 0, 'Fakelag : ' + fakelag_mode, [fake_indicator_color2[0], fake_indicator_color2[1], fake_indicator_color2[2], 255], _0x70a4xd2)
      Render.StringCustom(fake_indicatorX + 10, fake_indicatorY + 28, 0, 'History : ' + datafl1 + ' - ' + datafl2 + ' - ' + datafakelagmin + ' - ' + datafakelagmax, [fake_indicator_color2[0], fake_indicator_color2[1], fake_indicator_color2[2], 255], _0x70a4xd2)

      Render.GradientRect(fake_indicatorX, fake_indicatorY + 54, 3, 43, 1, [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 200], [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 175]);
      Render.GradientRect(fake_indicatorX, fake_indicatorY + 51, datadesync2 / 180 * 175 + 40, 3, 1, [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 200], [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 0]);
      Render.GradientRect(fake_indicatorX, fake_indicatorY + 96, datajitter2 / 180 * 175 + 40, 3, 1, [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 200], [fake_indicator_color1[0], fake_indicator_color1[1], fake_indicator_color1[2], 0]);
      Render.GradientRect(fake_indicatorX+3, fake_indicatorY + 56, 250, 40, 1, [0, 0, 0, 200], [0, 0, 0, 0]);
      Render.GradientRect(fake_indicatorX+3, fake_indicatorY + 74, ((datadesync2 / 180 * 155 + 60)+(datajitter2 / 180 * 155 + 60))/2, 2, 1, [0, 0, 0, 0], [255, 255, 255, 255]);
      Render.StringCustom(fake_indicatorX + 10, fake_indicatorY + 56, 0, 'Desync : ' + datadesync + "     Dir: " + datadir, [fake_indicator_color2[0], fake_indicator_color2[1], fake_indicator_color2[2], 255], _0x70a4xd2)
      Render.StringCustom(fake_indicatorX + 10, fake_indicatorY + 79, 0, 'Jitter : ' + datajitter + "     Status: " + status, [fake_indicator_color2[0], fake_indicator_color2[1], fake_indicator_color2[2], 255], _0x70a4xd2)

    }
    }
    if(rage_indicator_enable == 1)
    {
      if(alive == 1 || menu_open == 1)
      {
      if (key_pressed(0x1) && point_in_rect(mouse_pos(), {
          x: rage_indicatorX,
          y: rage_indicatorY
      }, {
        x: rage_indicatorX + 100,
        y: rage_indicatorY + 100
      })) {
        rage_indicatorX1 = mouse_pos()['x'] - rage_indicatorX
        rage_indicatorY1 = mouse_pos()['y'] - rage_indicatorY
        can_move1 = 1
        key_down(0x1)
      }

      if(key_released(0x1) == 1)
      {
        rage_indicatorX1 = mouse_pos()['x']
        rage_indicatorY1 = mouse_pos()['y']
        can_move1 = 0
      }

      if(can_move1 == 1)
      {
        rage_indicatorX = mouse_pos()['x'] - rage_indicatorX1
        rage_indicatorY = mouse_pos()['y'] - rage_indicatorY1
      }
      rage_indicator_color = [visu_intslider[30],visu_intslider[31],visu_intslider[32],255]
      var _0x70a4xd2 = Render.AddFont('Helvetica', 9, 700);
      Render.FilledCircle(rage_indicatorX + 50, rage_indicatorY + 50, 50, [0, 0, 0, 100]);
      var health = Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_iHealth')
      var armor = Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayerResource', 'm_iArmor')

      draw_arc(rage_indicatorX + 50, rage_indicatorY + 50, 65, adjust_angle(-30), 125, 4, [0, 0, 0, 20])
      draw_arc(rage_indicatorX + 50, rage_indicatorY + 50, 65, adjust_angle(-30), health * 1.25, 4, [250 - health * 2.5, 5 + health * 2.5, 0, 255])
      draw_arc(rage_indicatorX + 50, rage_indicatorY + 50, 65, adjust_angle(155), 125, 4, [0, 0, 0, 20])
      draw_arc(rage_indicatorX + 50, rage_indicatorY + 50, 65, adjust_angle(155 - (100 - armor)), armor * 1.25, 4, [0, 75, 255, 255])
      var weapon_font = Render.AddFont('Helvetica', 18, 700);
      Render.StringCustom(rage_indicatorX + 50, rage_indicatorY - 20, 1, health.toString(), [250 - health * 2.5, 5 + health * 2.5, 0, 255], _0x70a4xd2)
      Render.StringCustom(rage_indicatorX + 50, rage_indicatorY + 105, 1, armor.toString(), [0, 75, 255, 255], _0x70a4xd2)

        var weapon_font = Render.AddFont('AstriumWep', 18, 700);
        var wep2tab = {"usp s" : "G","glock 18" : "D","dual berettas" : "B","r8 revolver" : "J","desert eagle" : "A","p250" : "F","tec 9" : "H",
        "mp9": "O","mac 10": "K","pp bizon": "M","ump 45" : "L","ak 47" : "W","sg 553" : "V","aug" : "U","m4a1 s": "T","m4a4": "S","ssg 08": "a",
        "awp" : "Z","g3sg1" : "X","scar 20" : "Y","xm1014" : "b","mag 7" : "d","m249" : "g","negev" : "f","p2000" : "E","famas" : "R","five seven" : "C","mp7" : "N",
        "ump 45" : "L","p90" : "P","cz75 auto" : "I","mp5 sd" : "N","galil ar" : "Q","sawed off" : "c","zeus x27" : 'h','nova' : "e",'high explosive grenade' : 'j' ,'smoke grenade':'k','molotov' : 'l','incendiary grenade' : 'n','flashbang' : 'm' , 'decoy grenade':'i','c4 explosive':'o',
        "bayonet" : '1',"flip knife" : '2',"gut knife" : '3',"karambit" : '4',"m9 bayonet" : '5',"butterfly knife" : '8',"falchion knife" : '0',"shadow daggers" : '9',"bowie knife" : '7',"huntsman knife" : '6','knife':'1'};
        var weapon_icon = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
        //Render.StringCustom(0, 0, 0, '1234567890', rage_indicator_color, weapon_font)
        //Render.StringCustom(0, 20, 0, 'qwertyuiop', rage_indicator_color, weapon_font)
        //Render.StringCustom(0, 40, 0, 'asdfghjkl', rage_indicator_color, weapon_font)
        //Render.StringCustom(0, 60, 0, 'zxcvbnm', rage_indicator_color, weapon_font)
        //Render.StringCustom(0, 80, 0, 'QWERTYUIOP', rage_indicator_color, weapon_font)
        //Render.StringCustom(0, 100, 0, 'ASDFGHJKL', rage_indicator_color, weapon_font)
        //Render.StringCustom(0, 120, 0, 'ZXCVBNM', rage_indicator_color, weapon_font)
        Render.StringCustom(rage_indicatorX + 50, rage_indicatorY + 40, 1, wep2tab[weapon_icon], rage_indicator_color, weapon_font)
        tc_cs++
        var bullets = Entity.GetProp(Entity.GetWeapon(Entity.GetLocalPlayer()), 'CBaseCombatWeapon', 'm_iClip1')
        var wep2tab2 = {"usp s" : 12,"glock 18" : 20,"dual berettas" : 30,"r8 revolver" : 8,"desert eagle" : 7,"p250" : 15,"tec 9" : 18,
        "mp9": 25,"mac 10": 25,"pp bizon": 64,"ump 45" : 25,"ak 47" : 30,"sg 553" : 30,"aug" : 30,"m4a1 s": 25,"m4a4": 30,"ssg 08": 10,
        "awp" : 10,"g3sg1" : 20,"scar 20" : 20,"xm1014" : 7,"mag 7" : 5,"m249" : 100,"negev" : 150,"p2000" : 12,"famas" : 25,"five seven" : 12,"mp7" : 30,
        "ump 45" : 25,"p90" : 50,"cz75 auto" : 12,"mp5 sd" : 25,"galil ar" : 30,"sawed off" : 7,"zeus x27" : 1,'nova' : 7,'high explosive grenade' : 1 ,'smoke grenade':1,'molotov' : 1,'incendiary grenade' : 1,'flashbang' : 1 , 'decoy grenade':1,'c4 explosive':1,
        "bayonet" : 0,"flip knife" : 0,"gut knife" : 0,"karambit" : 0,"m9 bayonet" : 0,"butterfly knife" : 0,"falchion knife" : 0,"shadow daggers" : 0,"bowie knife" : 0,"huntsman knife" : 0,'knife':0};
        var bullets_max = wep2tab2[Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))]
        if(bullets == -1)
        {
          bullets = 1
          bullets_max = 1
        }
        draw_arc(rage_indicatorX + 50, rage_indicatorY + 50, 50, 270, 360,  5, [0, 0, 0, 20])
        for (var i = 1;i <= bullets;i++)
        {
          var blank = bullets_max / (bullets_max * 0.15)
          var length = 360 / bullets_max - blank
          var length_this = (length * i) + (blank * i - blank)
          var angle = 270 + length_this - length
          draw_arc(rage_indicatorX + 50, rage_indicatorY + 50, 50, angle, length,  5, [255, 255, 255, 255])
        }
        if(bullets_max == 1 || bullets_max == 0)
        {
          draw_arc(rage_indicatorX + 50, rage_indicatorY + 50, 50, 270, 360,  5, [255, 255, 255, 255])
        }
        Render.StringCustom(rage_indicatorX + 50, rage_indicatorY + 75, 1, bullets.toString(), [255, 255, 255, 255], _0x70a4xd2)
    }
  }
  if(indicator_enable == 1)
  {
    if(alive == 1)
    {
    var indicator_font = Render.AddFont('Helvetica', 9, 600);
    if(slowwalk == 1)
    {
      Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 15, 1, 'slow motion', [255,0,0,255], indicator_font)
    }
    if(moving == 1 && slowwalk == 0)
    {
      Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 15, 1, 'moving', [255,0,0,255], indicator_font)
    }
    if(static == 1)
    {
    Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 15, 1, 'static', [255,0,0,255], indicator_font)
    }
    if (UI.GetValue('Rage', 'Exploits', 'Hide shots') == 1 && UI.IsHotkeyActive('Rage', 'Exploits', 'Hide shots') == 1) {
      Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 39, 1, 'Hideshot', [185,185,185,255], indicator_font)
    }
    else {
      Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 39, 1, 'Hideshot', [55,55,55,255], indicator_font)
    }
    if(weapon_taken == 0)
    {
      if(UI.GetValue('Rage', 'AUTOSNIPER', 'Accuracy','Prefer body aim') == 1)
      {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [185,185,185,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [55,55,55,255], indicator_font)
      }
      if(UI.GetValue('Rage', 'AUTOSNIPER', 'Accuracy','Prefer safe point') == 1)
      {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [185,185,185,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [55,55,55,255], indicator_font)
      }
    }
    if(weapon_taken == 1)
    {
      if(UI.GetValue('Rage', 'PISTOL', 'Accuracy','Prefer body aim') == 1)
      {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [185,185,185,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [55,55,55,255], indicator_font)
      }
      if(UI.GetValue('Rage', 'PISTOL', 'Accuracy','Prefer safe point') == 1)
      {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [185,185,185,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [55,55,55,255], indicator_font)
      }
    }
    if(weapon_taken == 2)
    {
      if(UI.GetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer body aim') == 1)
      {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [185,185,185,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [55,55,55,255], indicator_font)
      }
      if(UI.GetValue('Rage', 'HEAVY PISTOL', 'Accuracy','Prefer safe point') == 1)
      {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [185,185,185,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [55,55,55,255], indicator_font)
      }
    }
    if(weapon_taken == 3)
    {
      if(UI.GetValue('Rage', 'SCOUT', 'Accuracy','Prefer body aim') == 1)
      {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [185,185,185,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [55,55,55,255], indicator_font)
      }
      if(UI.GetValue('Rage', 'SCOUT', 'Accuracy','Prefer safe point') == 1)
      {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [185,185,185,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [55,55,55,255], indicator_font)
      }
    }
    if(weapon_taken == 4)
    {
      if(UI.GetValue('Rage', 'AWP', 'Accuracy','Prefer body aim') == 1)
      {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [185,185,185,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [55,55,55,255], indicator_font)
      }
      if(UI.GetValue('Rage', 'AWP', 'Accuracy','Prefer safe point') == 1)
      {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [185,185,185,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [55,55,55,255], indicator_font)
      }
    }
    if(weapon_taken != 4 && weapon_taken != 3 && weapon_taken != 2 && weapon_taken != 1 && weapon_taken != 0)
    {
      if(UI.IsHotkeyActive('Rage','GENERAL','General','Force body aim') == 0)
      {
      Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [55,55,55,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 51, 1, 'Body aim', [185,185,185,255], indicator_font)
      }
      if(UI.IsHotkeyActive('Rage','GENERAL','General','Force safe point') == 0)
      {
      Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [55,55,55,255], indicator_font)
      }
      else {
        Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 63, 1, 'Safe point', [185,185,185,255], indicator_font)
      }
    }
    if(UI.IsHotkeyActive('Anti-Aim','Other','Fake duck') == 1)
    {
      Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 75, 1, 'Fake duck', [185,185,185,255], indicator_font)
    }
    else {
      Render.StringCustom(screen_size[0] / 2, screen_size[1] / 2 + 75, 1, 'Fake duck', [55,55,55,255], indicator_font)
    }
  }
  }
}
function rect(x, y, w, h, dir, color1, color2) {
Render.GradientRect(x - Math.round(w/2), y - Math.round(h/2), w, h, dir, color1, color2);
}





//击杀特效
var alpha = 0;
var size = 0;
var font_alpha = 0;

function render_effect() {
    if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable kill effect') == 0) {
        return
    };
    const _0x70a4x12e = ((1 / 0.75) * Global.Frametime()) * 255;
    const _0x70a4x12f = ((1 / 0.75) * Global.Frametime()) * 150;
    alpha = clamp(alpha - _0x70a4x12e, 0, 255);
    size = clamp(size - _0x70a4x12f, 0, 150);
    var _0x70a4x130 = [visu_intslider[24],visu_intslider[25],visu_intslider[26],255]
    const x = Global.GetScreenSize()[0],
        y = Global.GetScreenSize()[1];
    Render.GradientRect(0, 0, x, size, 0, [_0x70a4x130[0], _0x70a4x130[1], _0x70a4x130[2], alpha], [_0x70a4x130[0], _0x70a4x130[1], _0x70a4x130[2], 0]);
    Render.GradientRect(0, y - size, x, size, 0, [_0x70a4x130[0], _0x70a4x130[1], _0x70a4x130[2], 0], [_0x70a4x130[0], _0x70a4x130[1], _0x70a4x130[2], alpha]);
    Render.GradientRect(x - size, 0, size, y, 1, [_0x70a4x130[0], _0x70a4x130[1], _0x70a4x130[2], 0], [_0x70a4x130[0], _0x70a4x130[1], _0x70a4x130[2], alpha]);
    Render.GradientRect(0, 0, size, y, 1, [_0x70a4x130[0], _0x70a4x130[1], _0x70a4x130[2], alpha], [_0x70a4x130[0], _0x70a4x130[1], _0x70a4x130[2], 0])
}
var killy = 0
var killed = 0
var kills = 0
var font_alpha = 0
function on_death() {
    const _0x70a4x132 = Entity.GetEntityFromUserID(Event.GetInt('attacker'));
    const _0x70a4x133 = Entity.GetEntityFromUserID(Event.GetInt('userid'));
    const _0x70a4x134 = Entity.GetLocalPlayer();
    if (_0x70a4x132 == _0x70a4x134 && _0x70a4x133 != _0x70a4x134) {
        alpha = 255;
        size = 150;
        if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable kill draw') == 1) {
            killed = 1;
            killy = screen_size[1] / 2 - 50
            kills = kills + 1;
            font_alpha = 255
        }
    };
    if (_0x70a4x133 == _0x70a4x134) {
        kills = 0
    }
}





//击杀显示
function clamp(_0x70a4x136, min, max) {
    return Math['max'](Math['min'](_0x70a4x136, max), min)
}

function killdraw() {
    if (killed == 1) {
      killy = killy - 2
        const _0x70a4x138 = ((1 / 2.5) * Global.Frametime()) * 255;
        font_alpha = clamp(font_alpha - _0x70a4x138, 0, 255);
        if (kills == 1) {
            var _0x70a4x139 = [visu_intslider[27],visu_intslider[28],visu_intslider[29],255]
            var screen_size = Render.GetScreenSize();
            var _0x70a4xd2 = Render.AddFont('Helvetica', 12, 700);
            Render.StringCustom(screen_size[0] / 2, killy, 1, 'First Blood', [_0x70a4x139[0], _0x70a4x139[1], _0x70a4x139[2], font_alpha], _0x70a4xd2);
            kill_wait++
        };
        if (kills == 2) {
            var _0x70a4x139 = [visu_intslider[27],visu_intslider[28],visu_intslider[29],255]
            var screen_size = Render.GetScreenSize();
            var _0x70a4xd2 = Render.AddFont('Helvetica', 12, 700);
            Render.StringCustom(screen_size[0] / 2, killy, 1, 'Double Kill', [_0x70a4x139[0], _0x70a4x139[1], _0x70a4x139[2], font_alpha], _0x70a4xd2);
            kill_wait++
        };
        if (kills == 3) {
            var _0x70a4x139 = [visu_intslider[27],visu_intslider[28],visu_intslider[29],255]
            var screen_size = Render.GetScreenSize();
            var _0x70a4xd2 = Render.AddFont('Helvetica', 12, 700);
            Render.StringCustom(screen_size[0] / 2, killy, 1, 'Triple kill', [_0x70a4x139[0], _0x70a4x139[1], _0x70a4x139[2], font_alpha], _0x70a4xd2);
            kill_wait++
        };
        if (kills == 4) {
            var _0x70a4x139 = [visu_intslider[27],visu_intslider[28],visu_intslider[29],255]
            var screen_size = Render.GetScreenSize();
            var _0x70a4xd2 = Render.AddFont('Helvetica', 12, 700);
            Render.StringCustom(screen_size[0] / 2, killy, 1, 'Quadra kill', [_0x70a4x139[0], _0x70a4x139[1], _0x70a4x139[2], font_alpha], _0x70a4xd2);
            kill_wait++
        };
        if (kills == 5) {
            var _0x70a4x139 = [visu_intslider[27],visu_intslider[28],visu_intslider[29],255]
            var screen_size = Render.GetScreenSize();
            var _0x70a4xd2 = Render.AddFont('Helvetica', 12, 700);
            Render.StringCustom(screen_size[0] / 2, killy, 1, 'Penta kill', [_0x70a4x139[0], _0x70a4x139[1], _0x70a4x139[2], font_alpha], _0x70a4xd2);
            kill_wait++
        };
        if (kills > 5) {
            var _0x70a4x139 = [visu_intslider[27],visu_intslider[28],visu_intslider[29],255]
            var screen_size = Render.GetScreenSize();
            var _0x70a4xd2 = Render.AddFont('Helvetica', 12, 700);
            Render.StringCustom(screen_size[0] / 2, killy, 1, 'GOD LIKE', [_0x70a4x139[0], _0x70a4x139[1], _0x70a4x139[2], font_alpha], _0x70a4xd2);
            kill_wait++
        }
    }
}

function rotate(_0x70a4x13b, _0x70a4x13c, _0x70a4x13d, _0x70a4x13e, _0x70a4x13f) {
    rad = _0x70a4x13e * (Math['PI'] / 180);
    ind0 = (_0x70a4x13c ? Math['cos'](rad) : Math['sin'](rad)) * _0x70a4x13f;
    ind1 = (_0x70a4x13c ? Math['sin'](rad) : Math['cos'](rad)) * _0x70a4x13f;
    _0x70a4x13d[0] += _0x70a4x13b ? ind0 : -ind0;
    _0x70a4x13d[1] += _0x70a4x13b ? ind1 : -ind1;
    return _0x70a4x13d
}





//自动购买
var eab = 0
var health = Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_iHealth')
function buybot()
{
    if(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable buybot')==1)
    {
    UI.SetValue('Misc', 'GENERAL', 'Buybot', 'Enable', 0)
  }
         if(alive != eab || health != Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_iHealth'))
         {
             eab = alive
             health = Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_iHealth')
             if(health == 100)
             {
           if(alive == 1)
           {
          if(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Enable buybot')==1)
          {
          if(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Primary')==0)
          {
          Cheat.ExecuteCommand('buy scar20')
          }

          if(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Primary')==1)
          {
          Cheat.ExecuteCommand('buy ssg08')
          }

          if(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Primary')==2)
          {
          Cheat.ExecuteCommand('buy awp')
          }

          if(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Secondary')==1)
          {
          Cheat.ExecuteCommand('buy elite')
          }

          if(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Secondary')==0)
          {
          Cheat.ExecuteCommand('buy deagle')
          }

          if(UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', 'Other items')==1)
          {
          Cheat.ExecuteCommand('buy vesthelm')
          Cheat.ExecuteCommand('buy vest')
          Cheat.ExecuteCommand('buy defuser')
          Cheat.ExecuteCommand('buy taser')
          Cheat.ExecuteCommand('buy hegrenade')
          Cheat.ExecuteCommand('buy smokegrenade')
          Cheat.ExecuteCommand('buy incgrenade')
          }
        }
        }
        }
      }
}





Global.RegisterCallback('Draw', 'menu');
Global.RegisterCallback('Draw', 'main');
Global.RegisterCallback('Draw', 'Doubletap');
Global.RegisterCallback('Draw', 'Rage');
Global.RegisterCallback('Draw', 'Rage2');
Global.RegisterCallback('CreateMove', 'only_onshot');
Global.RegisterCallback('Draw', 'Anti_aim_angles');
Global.RegisterCallback('Draw', 'fake_indicator');
Global.RegisterCallback('ragebot_fire', 'fakelag_onshot');
Global.RegisterCallback('Draw', 'Fake_lag');
Global.RegisterCallback('CreateMove', 'AA');
Global.RegisterCallback('CreateMove', 'autostop');
Global.RegisterCallback('CreateMove', 'Detect_AA');
Global.RegisterCallback('weapon_fire', 'switch_aa1');
Global.RegisterCallback('player_hurt', 'switch_aa2');
Global.RegisterCallback('Draw', 'misc');
Global.RegisterCallback('Draw', 'visuals');
Global.RegisterCallback('player_death', 'on_death');
Global.RegisterCallback('Draw', 'render_effect');
Global.RegisterCallback('Draw', 'killdraw');
Global.RegisterCallback('Draw', 'buybot');
Global.PrintChat("欢迎使用VioLet.js破解版")
Global.PrintChat("破解作者: 黑弩")
Global.PrintChat("按home建打开js界面")
Global.PrintChat("VioLet.js可能与其他js冲突并导致闪退")
Global.PrintChat("本为开源js 原作者已同意")
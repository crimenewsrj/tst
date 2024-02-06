(function() {
  $(document).ready(function() {
    var animateChart, end_line_margin, movePin, movedLine, numsArr1, paper, path, path_position_x, path_position_y, randomInt, rateLoss, rateReset, rateResult, rateWin, renderPath, startGame, style, time, updatePath, updateTimer;
    paper = Snap('#chart');
    time = 15;
    end_line_margin = 0;
    // Start position
    path_position_x = -10;
    path_position_y = 200;
    // Stroke style
    style = {
      fill: '#00406E',
      stroke: '#fff',
      strokeWidth: 0
    };
    // Path style
    path = paper.path('').attr({
      stroke: '#fff',
      fill: 'l(0, 0, 1, 1)rgba(73, 134, 245, 0.65)-transparent',
      strokeWidth: 2.5
    });
    
    // Array for render start path
    numsArr1 = [226, 200, 190, 210, 195, 180, 177, 170, 172, 168, 160, 170, 163, 157, 156, 150, 140, 145, 138, 120, 124, 116, 136, 133, 138, 149, 132, 110, 90, 95, 80, 120, 123, 115, 110, 125, 129, 150, 156, 157, 163, 174, 176, 189, 200, 203, 207, 199, 196, 200, 190, 193, 200];
    // Render path function
    renderPath = function(pathArr) {
      var i, j, len, pathString;
      pathString = "M0,510";
      for (j = 0, len = pathArr.length; j < len; j++) {
        i = pathArr[j];
        path_position_x += 10;
        pathString += `L${path_position_x},${i}`;
      }
      pathString += `L${path_position_x + 10},510`;
      path.attr({
        d: pathString
      });
      path.animate({d: pathString}, 100, mina.easeinout)
      path.animate({d: pathString}, 1000, mina.elastic)
      return path_position_x = -10;
    };
    // Update path function
    updatePath = function() {
      movePin(path_position_y);
      renderPath(numsArr1);
      path_position_y = path_position_y + randomInt(-15, 15);
      if (path_position_y > 300) {
        path_position_y -= 50;
      }
      if (path_position_y < 50) {
        path_position_y += 50;
      }
      numsArr1.push(path_position_y);
      return numsArr1 = numsArr1.slice(1);
    };
    // Move pin position
    movePin = function(path_position_y) {
      var pin_pos;
      pin_pos = path_position_y - 30;
      $('#chart_pin').css('top', pin_pos);
      return $('#chart_arr').css('top', pin_pos + 5);
    };
    
    // Update nums in timer
    updateTimer = function() {
      var times;
      time -= 1;
      times = 15;
      if (time < 10) {
        times = '0' + time;
      } else {
        times = time;
      }
      return $('#time').text(times);
    };
    // Random integer
    randomInt = function(lower, upper) {
      if (upper == null) {
        [lower, upper] = [0, lower];
      }
      if (lower > upper) {
        [lower, upper] = [upper, lower];
      }
      return Math.floor(Math.random() * (upper - lower + 1) + lower);
    };
    // Animate path function (started on load)
    animateChart = function() {
      var i, j, results;
      results = [];
      for (i = j = 1; j <= 1500; i = ++j) {
        results.push(setTimeout((function() {
          return updatePath();
        }), i * 1000));
      }
      return results;
    };
    
    // Staart game function (started on click btns)
    startGame = function(rate) {
      var i, j, setPos;
      $('.chart__btn').fadeOut();
      $('.timer__circle').addClass('animated');
      $('#arrdown,#arrup').css('opacity', 0);
      $('#arr' + rate).css('opacity', 1);
      setPos = numsArr1[numsArr1.length - 3];
      $('#rate_line').css('top', setPos + 19).show();
      for (i = j = 1; j <= 15; i = ++j) {
        setTimeout((function() {
          return movedLine();
        }), i * 1000);
      }
      setTimeout((function() {
        return rateResult(rate, setPos, path_position_y);
      }), 15000);
      return setTimeout((function() {
        return rateReset();
      }), 16000);
    };
    // Resulting game
    rateResult = function(rate, setPos, path_position_y) {
      if (rate === 'up') {
        if (setPos > path_position_y) {
          return rateWin();
        } else {
          return rateLoss();
        }
      } else {
        if (setPos < path_position_y) {
          return rateWin();
        } else {
          return rateLoss();
        }
      }
    };
    // Reset game
    rateReset = function() {
      $('.timer__circle').removeClass('animated');
      $('.chart__btn').fadeIn();
      $('#rate_line').hide();
      $('#chart_endline').css('margin-left', '0');
      time = 15;
      end_line_margin = 0;
      $('#time').text(time);
      return $('#arrdown,#arrup').css('opacity', .3);
    };
    // if win
    rateWin = function() {
      return $('#chart_win').fadeIn();
    };
    //if loss
    rateLoss = function() {
      return $('#chart_loss').fadeIn();
    };
    
    //move end line
    movedLine = function() {
      end_line_margin += 10;
      updateTimer();
      return $('#chart_endline').css('margin-left', '-' + end_line_margin + 'px');
    };
    //start animation
    animateChart();
    // btn hovers
    $('#chart_up').hover((function() {
      $('#arrup').css('opacity', 1);
    }), function() {
      $('#arrup').css('opacity', .6);
    });
    $('#chart_down').hover((function() {
      $('#arrdown').css('opacity', 1);
    }), function() {
      $('#arrdown').css('opacity', .6);
    });
    $('#chart_up').click(function() {
      return startGame('up');
    });
    $('#chart_down').click(function() {
      return startGame('down');
    });
    return $('.chart__block__btn.btn.gray ').click(function() {
      return $('.chart__block').fadeOut();
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtBQUNoQixRQUFBLFlBQUEsRUFBQSxlQUFBLEVBQUEsT0FBQSxFQUFBLFNBQUEsRUFBQSxRQUFBLEVBQUEsS0FBQSxFQUFBLElBQUEsRUFBQSxlQUFBLEVBQUEsZUFBQSxFQUFBLFNBQUEsRUFBQSxRQUFBLEVBQUEsU0FBQSxFQUFBLFVBQUEsRUFBQSxPQUFBLEVBQUEsVUFBQSxFQUFBLFNBQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLFVBQUEsRUFBQTtJQUFBLEtBQUEsR0FBUSxJQUFBLENBQUssUUFBTDtJQUVSLElBQUEsR0FBTztJQUNQLGVBQUEsR0FBa0IsRUFIbEI7O0lBTUEsZUFBQSxHQUFrQixDQUFDO0lBQ25CLGVBQUEsR0FBa0IsSUFQbEI7O0lBVUEsS0FBQSxHQUNHO01BQUEsSUFBQSxFQUFNLFNBQU47TUFDQSxNQUFBLEVBQVEsTUFEUjtNQUVBLFdBQUEsRUFBYTtJQUZiLEVBWEg7O0lBZ0JBLElBQUEsR0FBTyxLQUNKLENBQUMsSUFERyxDQUNFLEVBREYsQ0FFSixDQUFDLElBRkcsQ0FHRDtNQUFBLE1BQUEsRUFBUSxPQUFSO01BQ0EsSUFBQSxFQUFNLGdEQUROO01BRUEsV0FBQSxFQUFhO0lBRmIsQ0FIQyxFQWhCUDs7O0lBd0JBLFFBQUEsR0FBVyxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxFQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBcUIsR0FBckIsRUFBeUIsR0FBekIsRUFBNkIsR0FBN0IsRUFBaUMsR0FBakMsRUFBcUMsR0FBckMsRUFBeUMsR0FBekMsRUFBNkMsR0FBN0MsRUFBaUQsR0FBakQsRUFBcUQsR0FBckQsRUFBeUQsR0FBekQsRUFBNkQsR0FBN0QsRUFBaUUsR0FBakUsRUFBcUUsR0FB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QUUsZUFBRixDQUFrQixDQUFDLE9BQW5CLENBQUE7SUFEc0MsQ0FBeEM7RUE5SWdCLENBQWxCO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeSAtPlxuICBwYXBlciA9IFNuYXAoJyNjaGFydCcpXG4gIFxuICB0aW1lID0gMTVcbiAgZW5kX2xpbmVfbWFyZ2luID0gMFxuXG4gICMgU3RhcnQgcG9zaXRpb25cbiAgcGF0aF9wb3NpdGlvbl94ID0gLTEwIFxuICBwYXRoX3Bvc2l0aW9uX3kgPSAyMDBcblxuICAjIFN0cm9rZSBzdHlsZVxuICBzdHlsZSA9XG4gICAgIGZpbGw6ICcjMDA0MDZFJ1xuICAgICBzdHJva2U6ICcjZmZmJ1xuICAgICBzdHJva2VXaWR0aDogMFxuXG4gICMgUGF0aCBzdHlsZVxuICBwYXRoID0gcGFwZXJcbiAgICAgLnBhdGggJydcbiAgICAgLmF0dHJcbiAgICAgICAgc3Ryb2tlOiAnZ3JlZW4nXG4gICAgICAgIGZpbGw6ICdsKDAsIDAsIDEsIDEpcmdiYSgwLCAxMjgsIDAsIDAuNzQpLXRyYW5zcGFyZW50J1xuICAgICAgICBzdHJva2VXaWR0aDogMi41XG4gIFxuICAjIEFycmF5IGZvciByZW5kZXIgc3RhcnQgcGF0aFxuICBudW1zQXJyMSA9IFsyMjYsMjAwLDE5MCwyMTAsMTk1LDE4MCwxNzcsMTcwLDE3MiwxNjgsMTYwLDE3MCwxNjMsMTU3LDE1NiwxNTAsMTQwLDE0NSwxMzgsMTIwLDEyNCwxMTYsMTM2LDEzMywxMzgsMTQ5LDEzMiwxMTAsOTAsOTUsODAsMTIwLDEyMywxMTUsMTEwLDEyNSwxMjksMTUwLDE1NiwxNTcsMTYzLDE3NCwxNzYsMTg5LDIwMCwyMDMsMjA3LDE5OSwxOTYsMjAwLDE5MCwxOTMsMjAwXVxuXG4gICMgUmVuZGVyIHBhdGggZnVuY3Rpb25cbiAgcmVuZGVyUGF0aCA9IChwYXRoQXJyKS0+XG4gICAgcGF0aFN0cmluZyA9IFwiTTAsMzI2XCJcbiAgICBmb3IgaSBpbiBwYXRoQXJyXG4gICAgICBwYXRoX3Bvc2l0aW9uX3ggKz0gMTBcbiAgICAgIHBhdGhTdHJpbmcgKz0gXCJMI3twYXRoX3Bvc2l0aW9uX3h9LCN7aX1cIlxuICAgIHBhdGhTdHJpbmcgKz0gXCJMI3twYXRoX3Bvc2l0aW9uX3grMTB9LDMyNlwiXG4gICAgcGF0aC5hdHRyIGQ6IHBhdGhTdHJpbmdcbiAgICAjcGF0aC5hbmltYXRlKHtkOiBwYXRoU3RyaW5nfSwgMTAwLCBtaW5hLmVhc2Vpbm91dClcbiAgICAjcGF0aC5hbmltYXRlKHtkOiBwYXRoU3RyaW5nfSwgMTAwMCwgbWluYS5lbGFzdGljKVxuICAgIHBhdGhfcG9zaXRpb25feCA9IC0xMFxuXG4gICMgVXBkYXRlIHBhdGggZnVuY3Rpb25cbiAgdXBkYXRlUGF0aCA9IC0+XG4gICAgbW92ZVBpbihwYXRoX3Bvc2l0aW9uX3kpXG4gICAgcmVuZGVyUGF0aChudW1zQXJyMSlcbiAgICBwYXRoX3Bvc2l0aW9uX3kgPSAocGF0aF9wb3NpdGlvbl95ICsgcmFuZG9tSW50KC0xNSwxNSkpXG4gICAgaWYgcGF0aF9wb3NpdGlvbl95ID4gMzAwIHRoZW4gcGF0aF9wb3NpdGlvbl95IC09IDUwXG4gICAgaWYgcGF0aF9wb3NpdGlvbl95IDwgNTAgdGhlbiBwYXRoX3Bvc2l0aW9uX3kgKz0gNTBcbiAgICBudW1zQXJyMS5wdXNoIHBhdGhfcG9zaXRpb25feVxuICAgIG51bXNBcnIxID0gbnVtc0FycjFbMS4uXVxuXG4gICMgTW92ZSBwaW4gcG9zaXRpb25cbiAgbW92ZVBpbiA9IChwYXRoX3Bvc2l0aW9uX3kpIC0+XG4gICAgcGluX3BvcyA9IHBhdGhfcG9zaXRpb25feS0zMFxuICAgICQoJyNjaGFydF9waW4nKS5jc3MoJ3RvcCcsIHBpbl9wb3MpXG4gICAgJCgnI2NoYXJ0X2FycicpLmNzcygndG9wJywgcGluX3Bvcys1KVxuICAgIFxuICAjIFVwZGF0ZSBudW1zIGluIHRpbWVyXG4gIHVwZGF0ZVRpbWVyID0gLT5cbiAgICB0aW1lIC09MVxuICAgIHRpbWVzID0gMTVcbiAgICBpZiB0aW1lIDwgMTAgdGhlbiB0aW1lcyA9ICcwJyt0aW1lIGVsc2UgdGltZXMgPSB0aW1lXG4gICAgJCgnI3RpbWUnKS50ZXh0KHRpbWVzKVxuXG4gICMgUmFuZG9tIGludGVnZXJcbiAgcmFuZG9tSW50ID0gKGxvd2VyLCB1cHBlcikgLT5cbiAgICBbbG93ZXIsIHVwcGVyXSA9IFswLCBsb3dlcl0gICAgIHVubGVzcyB1cHBlcj9cbiAgICBbbG93ZXIsIHVwcGVyXSA9IFt1cHBlciwgbG93ZXJdIGlmIGxvd2VyID4gdXBwZXJcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlciArIDEpICsgbG93ZXIpXG5cbiAgIyBBbmltYXRlIHBhdGggZnVuY3Rpb24gKHN0YXJ0ZWQgb24gbG9hZClcbiAgYW5pbWF0ZUNoYXJ0ID0gLT5cbiAgICBmb3IgaSBpbiBbMS4uMTUwMF1cbiAgICAgIHNldFRpbWVvdXQgKC0+IHVwZGF0ZVBhdGgoKSksIGkqMTAwMFxuICBcbiAgIyBTdGFhcnQgZ2FtZSBmdW5jdGlvbiAoc3RhcnRlZCBvbiBjbGljayBidG5zKVxuICBzdGFydEdhbWUgPSAocmF0ZSkgLT5cbiAgICAkKCcuY2hhcnRfX2J0bicpLmZhZGVPdXQoKVxuICAgICQoJy50aW1lcl9fY2lyY2xlJykuYWRkQ2xhc3MoJ2FuaW1hdGVkJylcbiAgICAkKCcjYXJyZG93biwjYXJydXAnKS5jc3MoJ29wYWNpdHknLCAwKVxuICAgICQoJyNhcnInK3JhdGUpLmNzcygnb3BhY2l0eScsIDEpXG4gICAgc2V0UG9zID0gbnVtc0FycjFbbnVtc0FycjEubGVuZ3RoLTNdXG4gICAgJCgnI3JhdGVfbGluZScpLmNzcygndG9wJywgc2V0UG9zKzE5KS5zaG93KClcbiAgICBmb3IgaSBpbiBbMS4uMTVdXG4gICAgICBzZXRUaW1lb3V0ICgtPiBtb3ZlZExpbmUoKSksIGkqMTAwMFxuXG4gICAgc2V0VGltZW91dCAoLT4gcmF0ZVJlc3VsdChyYXRlLCBzZXRQb3MsIHBhdGhfcG9zaXRpb25feSkpLCAxNTAwMFxuICAgIHNldFRpbWVvdXQgKC0+IHJhdGVSZXNldCgpKSwgMTYwMDBcblxuICAjIFJlc3VsdGluZyBnYW1lXG4gIHJhdGVSZXN1bHQgPSAocmF0ZSwgc2V0UG9zLCBwYXRoX3Bvc2l0aW9uX3kpIC0+XG4gICAgaWYgcmF0ZSA9PSAndXAnIFxuICAgICAgaWYgc2V0UG9zID4gcGF0aF9wb3NpdGlvbl95IHRoZW4gcmF0ZVdpbigpIGVsc2UgcmF0ZUxvc3MoKVxuICAgIGVsc2VcbiAgICAgIGlmIHNldFBvcyA8IHBhdGhfcG9zaXRpb25feSB0aGVuIHJhdGVXaW4oKSBlbHNlIHJhdGVMb3NzKClcblxuICAjIFJlc2V0IGdhbWVcbiAgcmF0ZVJlc2V0ID0gLT5cbiAgICAkKCcudGltZXJfX2NpcmNsZScpLnJlbW92ZUNsYXNzKCdhbmltYXRlZCcpXG4gICAgJCgnLmNoYXJ0X19idG4nKS5mYWRlSW4oKVxuICAgICQoJyNyYXRlX2xpbmUnKS5oaWRlKClcbiAgICAkKCcjY2hhcnRfZW5kbGluZScpLmNzcygnbWFyZ2luLWxlZnQnLCAnMCcpO1xuICAgIHRpbWUgPSAxNVxuICAgIGVuZF9saW5lX21hcmdpbiA9IDBcbiAgICAkKCcjdGltZScpLnRleHQodGltZSlcbiAgICAkKCcjYXJyZG93biwjYXJydXAnKS5jc3MoJ29wYWNpdHknLCAuMylcblxuICAjIGlmIHdpblxuICByYXRlV2luID0gLT5cbiAgICAkKCcjY2hhcnRfd2luJykuZmFkZUluKClcbiAgI2lmIGxvc3NcbiAgcmF0ZUxvc3MgPSAtPlxuICAgICQoJyNjaGFydF9sb3NzJykuZmFkZUluKCkgXG4gICNtb3ZlIGVuZCBsaW5lXG4gIG1vdmVkTGluZSA9IC0+XG4gICAgZW5kX2xpbmVfbWFyZ2luICs9IDEwXG4gICAgdXBkYXRlVGltZXIoKVxuICAgICQoJyNjaGFydF9lbmRsaW5lJykuY3NzKCdtYXJnaW4tbGVmdCcsICctJytlbmRfbGluZV9tYXJnaW4rJ3B4JylcblxuICAjc3RhcnQgYW5pbWF0aW9uXG4gIGFuaW1hdGVDaGFydCgpXG5cbiAgIyBidG4gaG92ZXJzXG4gICQoJyNjaGFydF91cCcpLmhvdmVyICgtPlxuICAgICQoJyNhcnJ1cCcpLmNzcygnb3BhY2l0eScsIDEpXG4gICAgcmV0dXJuXG4gICksIC0+XG4gICAgJCgnI2FycnVwJykuY3NzKCdvcGFjaXR5JywgLjYpXG4gICAgcmV0dXJuXG5cbiAgICQoJyNjaGFydF9kb3duJykuaG92ZXIgKC0+XG4gICAgJCgnI2FycmRvd24nKS5jc3MoJ29wYWNpdHknLCAxKVxuICAgIHJldHVyblxuICApLCAtPlxuICAgICQoJyNhcnJkb3duJykuY3NzKCdvcGFjaXR5JywgLjYpXG4gICAgcmV0dXJuXG5cblxuICAkKCcjY2hhcnRfdXAnKS5jbGljayAtPlxuICAgIHN0YXJ0R2FtZSgndXAnKVxuXG4gICQoJyNjaGFydF9kb3duJykuY2xpY2sgLT5cbiAgICBzdGFydEdhbWUoJ2Rvd24nKVxuXG4gICQoJy5jaGFydF9fYmxvY2tfX2J0bi5idG4uZ3JheSAnKS5jbGljayAtPlxuICAgICQoJy5jaGFydF9fYmxvY2snKS5mYWRlT3V0KCkiXX0=
//# sourceURL=coffeescript
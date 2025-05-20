from docutils import nodes
from docutils.parsers.rst import Directive, directives


HTML = '''
<div class="micropython-demo">
  <pre style="display: none;">
{code}
  </pre>
  
  <div>
  
    <div class="toolbar">
      <label for="font-size">Fuente:</label>
      <select class="font-size">
        <option>12</option>
        <option>14</option>
        <option>16</option>
        <option>18</option>
        <option selected>20</option>
        <option>24</option>
        <option>28</option>
        <option>32</option>
        <option>36</option>
        <option>40</option>
      </select>
    
      <label for="theme">Tema:</label>
      <select class="theme">
        <option value="vs">Claro</option>
        <option value="vs-dark" selected>Oscuro</option>
        <option value="hc-black">Alto contraste</option>
      </select>
    
      <span class="status-indicator"></span>
      <button class="connect">Conectar</button>
      <button class="send" disabled>▶ Ejecutar</button>
      <button class="restart" disabled>Reiniciar</button>
      <button class="toggle-video">Cámara</button>
    </div>
    
    <div class="container">
      <div class="editor"></div>
      <div class="resizer"></div>
      <div class="terminal"></div>
    </div>

  </div>
  
  <video controls class="micropython-demo-video">
    <source src="{video_path}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
'''


class MicroPythonDemo(Directive):
    has_content = True
    optional_arguments = 0
    final_argument_whitespace = False
    option_spec = {
        'video': directives.unchanged,
    }

    def run(self):
        self.assert_has_content()

        video_path = self.options['video']
        html = HTML.format(video_path=video_path, code='\n'.join(self.content))
        raw_html = nodes.raw('', html, format='html')

        return [raw_html]


def setup(app):
    app.add_directive("micropython-demo", MicroPythonDemo)
    return {
        'version': '1.0',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }


Rutta.router({
	name: 'main',
	routes: [
		{
			path: '/',
			title: 'Alex Elias',
			handler: function (req, res) {
				return res.file('./public/index.html');
			}
		},
		{
			path: '/projects',
			title: 'Projects | Alex Elias',
			handler: function (req, res) {
				return res.file('./public/projects.html');
			}
		},
		{
			path: '/contact',
			title: 'Contact | Alex Elias',
			handler: function (req, res) {
				return res.file('./public/contact.html');
			}
		},
		{
			path: /.*?/,
			title: '404',
			handler: function (req, res) {
				return res.content('<h1>404</h1>');
			}
		}
	]
}).listen();

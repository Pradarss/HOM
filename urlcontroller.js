const Url = require('./url.model');
const crypto = require('crypto');

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'Original URL is required' });

  try {
    const shortId = crypto.randomBytes(4).toString('hex');
    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();

    res.status(201).json({ shortUrl: `${req.headers.host}/${shortId}` });
  } catch (err) {
    res.status(500).json({ error: 'Error saving the URL' });
  }
};

exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    url.clicks++;
    url.lastAccessed = new Date();
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Error handling the request' });
  }
};

exports.getUrlStats = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    res.json({
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching URL stats' });
  }
};

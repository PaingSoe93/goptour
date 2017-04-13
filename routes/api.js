const express = require('express');
var router = express.Router();

const TourCompanyController = require('../controllers/TourCompanyController');
const TourPackageController = require('../controllers/TourPackageController');
const ImagesUploadController = require('../controllers/ImagesUploadController');
const BookingController = require('../controllers/BookingController');
var controllers = {
	company: TourCompanyController,
	package: TourPackageController,
  image: ImagesUploadController,
	booking: BookingController
}

router.get('/package/upcoming', (req, res, next) => {
	TourPackageController.getByDate(function(err, result){
			if (err){
				res.json({
					confirmation:'fail',
					message: 'Not Found'
				})
				return;
			}

			res.json({
				confirmation:'success',
				results: result
			})

			return
		});
});

router.get('/:resource', (req, res, next) => {
  var resource = req.params.resource;
  var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Request Link'
		})

		return
	}

  controller.get(req.query, function(err, results){
		if (err){
			res.json({
				confirmation:'fail',
				message: err
			})

			return;
		}

		res.json({
			confirmation:'success',
			results: results
		})

		return
	})
})

router.get('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource
	var id = req.params.id

  var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Request Link'

		})

		return
	}

	controller.getById(id, function(err, result){
		if (err){
			res.json({
				confirmation:'fail',
				message: 'Not Found'
			})
			return;
		}

		res.json({
			confirmation:'success',
			results: result
		})

		return
	});

});

router.post('/:resource', (req, res, next) => {

  var resource = req.params.resource
	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'

		})

		return
	}

  controller.post(req, function(err, result){
    if(err){
      res.json({
        confirmation: 'fail',
        message : err
      })
      return
    }

    res.json({
      confirmation: 'success',
      results: result
    })
    return
  })
});

router.put('/:resource/:id', (req, res, next) => {
	var resource = req.params.resource;
	var id = req.params.id;

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'

		})

		return
	}
	controller.put(id, req, function(err, result){
		if(err){
      res.json({
        confirmation: 'fail',
        message : err
      })
      return
    }

    res.json({
      confirmation: 'success',
      results: result
    })
    return
	})
});

router.delete('/:resource/:id', (req, res, next) => {
	var resource = req.params.resource;
	var id = req.params.id;

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'

		})

		return
	}

	controller.delete(id, function(err, result) {
		if(err){
      res.json({
        confirmation: 'fail',
        message : err
      })
      return
    }

    res.json({
      confirmation: 'success',
      results: result
    })
    return
	})
})

module.exports = router;

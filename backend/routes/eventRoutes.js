
// const express = require('express');
// const verifyToken = require('../middlewares/authMiddleware');
// const Event = require('../models/Event');
// const router = express.Router();

// // Create Event
// router.post('/', verifyToken, async (req, res) => {
//     const { title, description, date, location, maxAttendees } = req.body;
//     try {
//         const event = new Event({
//             title,
//             description,
//             date,
//             location,
//             maxAttendees,
//             creator: req.user.id, // `verifyToken` ensures `req.user` is set.
//         });
//         await event.save();
//         res.status(201).json(event);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating event', error: error.message });
//     }
// });

// // Get All Events
// router.get('/', async (req, res) => {
//     try {
//         const events = await Event.find().populate('creator', 'name email'); // Verify "creator" is populated correctly.
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching events', error: error.message });
//     }
// });

// // Update Event
// router.put('/:id', verifyToken, async (req, res) => {
//     const { id } = req.params;
//     const { title, description, date, location, maxAttendees } = req.body;

//     try {
//         const event = await Event.findById(id);
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         if (event.creator.toString() !== req.user.id) {
//             return res.status(403).json({ message: 'Unauthorized to update this event' });
//         }

//         // Update fields only if provided
//         event.title = title || event.title;
//         event.description = description || event.description;
//         event.date = date || event.date;
//         event.location = location || event.location;
//         event.maxAttendees = maxAttendees || event.maxAttendees;

//         const updatedEvent = await event.save();
//         res.json(updatedEvent);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating event', error: error.message });
//     }
// });

// // Delete Event
// router.delete('/:id', verifyToken, async (req, res) => {
//     const { id } = req.params;

//     try {
//         const event = await Event.findById(id);
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         if (event.creator.toString() !== req.user.id) {
//             return res.status(403).json({ message: 'Unauthorized to delete this event' });
//         }

//         await event.remove();
//         res.json({ message: 'Event deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting event', error: error.message });
//     }
// });

// // RSVP to Event
// router.post('/:id/rsvp', verifyToken, async (req, res) => {
//     const { id } = req.params;

//     try {
//         const event = await Event.findById(id);
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         if (event.attendees.length >= event.maxAttendees) {
//             return res.status(400).json({ message: 'Event is fully booked' });
//         }
//         if (event.attendees.includes(req.user.id)) {
//             return res.status(400).json({ message: 'You have already RSVP’d to this event' });
//         }

//         event.attendees.push(req.user.id);
//         await event.save();
//         res.json({ message: 'RSVP successful', event });
//     } catch (error) {
//         res.status(500).json({ message: 'Error RSVP’ing to event', error: error.message });
//     }
// });

// module.exports = router;

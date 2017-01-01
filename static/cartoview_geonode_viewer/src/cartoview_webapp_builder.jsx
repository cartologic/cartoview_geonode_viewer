/**
 * 
 *
 * This is an awesome project to make everyone happy!
 *
 * [sample] This comment is document for class. You can use some HTML tags.
 *
 * @author CartoLogic
 *
 * @see https://github.com/cartologic/cartoview_webapp_builder
 *
 * License: The Unlicense (Public Domain)
 */

__export__ class cartoview_webapp_builder
{
    var message : string;

    /**
     * Constructs cartoview_webapp_builder object.
     */
    function constructor()
    {
    }

    /**
     * [sample] Update message.
     *
     * @param message [sample] Message string to store.
     */
    function setMessage(message : string) : void
    {
        this.message = message;
    }

    /**
     * [sample] Returns greeting message.
     *
     * @return [sample] greeting message.
     */
    function greeting() : string
    {
        return this.message;
    }
}
